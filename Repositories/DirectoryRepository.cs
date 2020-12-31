using Microsoft.Extensions.Configuration;
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

      foreach (var f in System.IO.Directory.GetFiles(fullPath))
      {
        var file = new File { Name = GetShortPath(f), FullName = StripRoot(f, _rootFilePath) };
        directory.Files.Add(file);
      }

      foreach (var subDir in System.IO.Directory.GetDirectories(fullPath))
      {
        directory.SubDirectories.Add(StripRoot(subDir, _rootFilePath));
      }

      return directory;
    }
  }
}
