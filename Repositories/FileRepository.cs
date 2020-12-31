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
    Dictionary<string, FileDirectory> GetAllContents(string path);
    FileDirectory GetContents(string path);
  }

  public class FileRepository : IFileRepository
  {
    private readonly string _rootFilePath;

    public FileRepository(IConfiguration config)
    {
      _rootFilePath = config["RootFilePath"];
    }

    public FileDirectory GetContents(string path)
    {
      var fullPath = $"{_rootFilePath}{path}";
      var info = new DirectoryInfo(fullPath);
      var directory = new FileDirectory
      {
        FullName = path,
        Name = GetShortPath(path),
        Parent = string.IsNullOrEmpty(path) ? null : info.Parent != null ? StripRoot(info.Parent.FullName) : null
      };

      foreach (var f in Directory.GetFiles(fullPath))
      {
        var file = new File { Name = GetShortPath(f), FullName = StripRoot(f) };
        directory.Files.Add(file);
      }

      foreach (var subDir in Directory.GetDirectories(fullPath))
      {
        directory.SubDirectories.Add(StripRoot(subDir));
      }

      return directory;
    }

    public Dictionary<string, FileDirectory> GetAllContents(string rootPath)
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

    private string StripRoot(string fullPath)
    {
      var parts = fullPath.Split(_rootFilePath);
      return parts.Length > 0 ? parts[1] : "";
    }

    private string GetShortPath(string fullPath)
    {
      var parts = fullPath.Split('\\');
      return parts[parts.Length - 1];
    }
  }
}
