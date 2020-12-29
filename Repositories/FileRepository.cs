using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebFileExplorer.Models;

namespace WebFileExplorer.Repositories
{
  public interface IFileRepository
  {
    Dictionary<string, FileDirectory> GetContents(string path);
  }

  public class FileRepository : IFileRepository
  {
    private readonly string _rootFilePath;

    public FileRepository(IConfiguration config)
    {
      _rootFilePath = config["RootFilePath"];
    }

    public Dictionary<string, FileDirectory> GetContents(string rootPath)
    {
      var directoryLookup = new Dictionary<string, FileDirectory>();

      // Use a stack to traverse the directory tree by pushing the full name
      // of each subdirectory to process...
      var stack = new Stack<string>();
      stack.Push(rootPath);

      while (stack.Count > 0)
      {
        var currentPath = stack.Pop();
        var directoryInfo = new DirectoryInfo(currentPath);
        var directory = new FileDirectory
        {
          Name = GetShortPath(currentPath),
          Parent = directoryInfo.FullName == rootPath ? null : directoryInfo.Parent?.FullName /* remove drive letter? */
        };

        foreach (var f in Directory.GetFiles(currentPath))
        {
          var file = new File { Name = GetShortPath(f), FullName = f };
          directory.Files.Add(file);
        }

        foreach (var subDir in Directory.GetDirectories(currentPath))
        {
          directory.SubDirectories.Add(subDir);
          stack.Push(subDir);
        }

        directoryLookup.Add(currentPath, directory);
      }

      return directoryLookup;
    }

    //public FileDirectory GetContentsOrig(string path)
    //{
    //  DirectoryInfo info = new DirectoryInfo(path);

    //  var fileDirectory = new FileDirectory { Name = info.Name, FullName = RemoveDriveLetter(info.FullName) };
    //  var directories = Directory.GetDirectories(path);

    //  foreach (var dir in directories)
    //  {
    //    fileDirectory.SubDirectories.Add(GetContentsOrig(dir));
    //  }

    //  var files = Directory.GetFiles(path);
    //  foreach (var f in files)
    //  {
    //    var file = new File { Name = GetShortPath(f), FullName = f };
    //    fileDirectory.Files.Add(file);
    //  }

    //  return fileDirectory;
    //}

    private string RemoveDriveLetter(string fullPath)
    {
      var parts = fullPath.Split(':');
      return parts[1];
    }

    private string GetShortPath(string fullPath)
    {
      var parts = fullPath.Split('\\');
      return parts[parts.Length - 1];
    }
  }
}
