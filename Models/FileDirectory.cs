using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFileExplorer.Models
{
  public class FileDirectory
  {
    public string Name { get; init; } = "";
    public string FullPath { get; init; } = "";
    public IList<FileDirectory> SubDirectories { get; } = new List<FileDirectory>();
    public IList<File> Files { get; } = new List<File>();
  }
}
