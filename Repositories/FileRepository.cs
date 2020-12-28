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
      DirectoryInfo info = new DirectoryInfo(path);

      var fileDirectory = new FileDirectory { Name = info.Name, FullName = info.FullName };
      var directories = Directory.GetDirectories(path);

      foreach (var dir in directories)
      {
        fileDirectory.SubDirectories.Add(GetContents(dir));
      }

      var files = Directory.GetFiles(path);
      foreach (var f in files)
      {
        var file = new File { Name = GetShortPath(f), FullName = f };
        fileDirectory.Files.Add(file);
      }

      return fileDirectory;
    }

    private string GetShortPath(string fullPath)
    {
      var parts = fullPath.Split('\\');
      return parts[parts.Length - 1];
    }
  }
}
