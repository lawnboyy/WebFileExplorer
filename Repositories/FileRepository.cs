using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using WebFileExplorer.Models;
using static WebFileExplorer.Utilities.PathUtility;

namespace WebFileExplorer.Repositories
{
  public interface IFileRepository
  {
    Task AddFile(string path, IFormFile file);
    void CopyFile(string sourcePath, string destinationPath);
    IEnumerable<File> Search(string term, string rootPath);
    IEnumerable<File> SearchBfs(string term, string rootPath);
    IEnumerable<File> SearchBfsParallel(string term, string rootPath);
    IEnumerable<File> SearchRecursiveParallel(string term, string rootPath);
  }

  public class FileRepository : IFileRepository
  {

    public FileRepository()
    {
    }

    public async Task AddFile(string path, IFormFile file)
    {
      using var fileStream = System.IO.File.Create($"{path}\\{file.FileName}");
      await file.CopyToAsync(fileStream);
    }

    public void CopyFile(string sourcepath, string destinationPath)
    {
      System.IO.File.Copy(sourcepath, destinationPath);
    }

    private IEnumerable<File> SearchByIndex(string term, string rootPath)
    {
      var connection = new OleDbConnection(@"Provider=Search.CollatorDSO;Extended Properties=""Application=Windows""");

      // File name search (case insensitive), also searches sub directories
      var query1 = $"SELECT System.ItemName, System.ItemPathDisplay, System.Size FROM SystemIndex WHERE scope ='file:{rootPath.Replace("\\", "/")}' AND System.ItemName LIKE '%{term}%' AND System.ItemType != 'Directory'";

      connection.Open();

      var command = new OleDbCommand(query1, connection);
      var files = new List<File>();
      using (var r = command.ExecuteReader())
      {
        while (r.Read())
        {
          files.Add(new File
          {
            Name = r.GetString(0),
            FullName = StripRoot(r.GetString(1), rootPath),
            SizeInBytes = Convert.ToInt64((decimal)r.GetValue(2))
          });
        }
      }

      connection.Close();
      return files;
    }

    public IEnumerable<File> Search(string term, string rootPath)
    {
      if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
      {
        return SearchByIndex(term, rootPath);
      }
      else
      {
        // Built in search; easy peazy...
        var info = new DirectoryInfo(rootPath);
        return info
          .GetFiles(term, SearchOption.AllDirectories)
          .Select(f => new File
          {
            Name = f.Name,
            FullName = StripRoot(f.FullName, rootPath)
          });
      }
    }

    public IEnumerable<File> SearchBfsParallel(string term, string rootPath)
    {
      var queue = new ConcurrentQueue<string>();
      queue.Enqueue(rootPath);
      var results = new ConcurrentBag<File>();

      while (queue.Count > 0)
      {
        var count = queue.Count;
        Parallel.For(0, count, (i) =>
        {
          if (queue.TryDequeue(out var path))
          {
            var info = new DirectoryInfo(path);
            var subDirectories = System.IO.Directory.GetDirectories(info.FullName);
            foreach (var file in info.GetFiles(term, SearchOption.TopDirectoryOnly))
            {
              results.Add(new File { FullName = file.FullName, Name = file.Name });
            }

            foreach (var sub in subDirectories)
            {
              queue.Enqueue(sub);
            }
          }
        });
      }

      return results;
    }

    public IEnumerable<File> SearchRecursiveParallel(string term, string rootPath)
    {
      var files = new ConcurrentBag<File>();
      SearchRecursiveParallel(term, new DirectoryInfo(rootPath), files);
      return files;
    }

    private void SearchRecursiveParallel(string term, DirectoryInfo dirInfo, ConcurrentBag<File> files)
    {
      foreach (var file in dirInfo.GetFiles(term, SearchOption.TopDirectoryOnly))
      {
        files.Add(new File { FullName = file.FullName, Name = file.Name });
      }

      Parallel.ForEach(dirInfo.GetDirectories(), (sub) =>
      {
        SearchRecursiveParallel(term, sub, files);
      });
    }

    public IEnumerable<File> SearchBfs(string term, string rootPath)
    {
      var files = new List<File>();
      var queue = new Queue<string>();
      queue.Enqueue(rootPath);

      while (queue.Count > 0)
      {
        var count = queue.Count;
        for (int i = 0; i < count; i++)
        {
          var path = queue.Dequeue();
          var dirInfo = new DirectoryInfo(path);
          foreach (var file in dirInfo.GetFiles(term, SearchOption.TopDirectoryOnly))
          {
            files.Add(new File { FullName = file.FullName, Name = file.Name });
          }

          foreach (var subDir in System.IO.Directory.GetDirectories(path))
          {
            queue.Enqueue(subDir);
          }
        }
      }

      return files;
    }

    //    File Search Performance Tests

    //"Docker*"
    //                                       r1     r2       r3
    //Built-in Search All Directories    26.58s  11.72s  11.56s

    //Breadth-first                      42.05s  37.81s  41.44s

    //Breadth-first Parallel             17.89s  17.89s  18.66s

    //Recursive Parallel                 20.81s  20.07s  19.04s



    //"*.js"

    //                                       r1     r2       r3       r4
    //Built-in Search All Directories    12.29s  16.07s  13.86s   11.33s

    //Breadth-first                      44.60s  34.75s  31.25s   39.77s

    //Breadth-first Parallel             14.90s  14.66s  15.18s   14.61s

    //Recursive Parallel                 28.37s  23.91s  19.87s   18.85s
  }
}
