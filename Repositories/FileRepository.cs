using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebFileExplorer.Models;
using static WebFileExplorer.Utilities.PathUtility;

namespace WebFileExplorer.Repositories
{
  public interface IFileRepository
  {
    IEnumerable<File> Search(string term);
  }

  public class FileRepository : IFileRepository
  {
    private readonly string _rootFilePath;

    public FileRepository(IConfiguration config)
    {
      _rootFilePath = config["RootFilePath"];
    }

    public IEnumerable<File> Search(string term)
    {
      // Built in search; easy peazy...
      var info = new DirectoryInfo(_rootFilePath);
      return info
        .GetFiles(term, SearchOption.AllDirectories)
        .Select(f => new File
        {
          Name = f.Name,
          FullName = StripRoot(f.FullName, _rootFilePath)
        });
    }
  }
}
