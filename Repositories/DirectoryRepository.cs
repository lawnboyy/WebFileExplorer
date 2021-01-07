using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.IO;
using static WebFileExplorer.Utilities.PathUtility;

namespace WebFileExplorer.Repositories
{
  public interface IDirectoryRepository
  {
    Models.Directory GetContents(string path);
  }

  public class DirectoryRepository : IDirectoryRepository
  {
    private readonly string _rootFilePath;

    public DirectoryRepository(IConfiguration config)
    {
      _rootFilePath = config["RootFilePath"];
    }

    public Models.Directory GetContents(string path)
    {
      var fullPath = $"{_rootFilePath}\\{path}";
      var info = new DirectoryInfo(fullPath);
      var directory = new Models.Directory
      {
        FullName = path,
        Name = GetShortPath(path),
        Parent = string.IsNullOrEmpty(path)
          ? null
          : info.Parent != null
            ? info.Parent.FullName == _rootFilePath
              ? ""
              : StripRoot(info.Parent.FullName, _rootFilePath)
            : null
      };

      foreach (var f in info.EnumerateFiles())
      {
        var file = new File
        {
          Name = f.Name,
          FullName = StripRoot(f.FullName, _rootFilePath),
          SizeInBytes = f.Length
        };
        directory.Files.Add(file);
      }

      foreach (var subDir in info.EnumerateDirectories())
      {
        var subDirectory = new Models.Directory
        {
          Name = subDir.Name,
          FullName = StripRoot(subDir.FullName, _rootFilePath),
          ItemCount = subDir.GetFiles().Length + subDir.GetDirectories().Length
        };
        directory.SubDirectories.Add(subDirectory);
      }

      // TODO: This is way too slow. Need to process in the background and
      // cache it.
      // directory.SizeInBytes = CalculateFolderSize(info);

      return directory;
    }

    private long CalculateFolderSize(DirectoryInfo dirInfo)
    {
      // This is very slow. May want to try the built in GetAllFiles
      // method to see if it's faster.
      var queue = new Queue<DirectoryInfo>();
      queue.Enqueue(dirInfo);
      long result = 0;

      while (queue.Count > 0)
      {
        var count = queue.Count;
        for (int i = 0; i < count; i++)
        {
          var dir = queue.Dequeue();

          foreach (var file in dir.EnumerateFiles())
          {
            result += file.Length;
          }

          foreach (var subDir in dir.EnumerateDirectories())
          {
            queue.Enqueue(subDir);
          }
        }
      }

      return result;
    }
  }
}
