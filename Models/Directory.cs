using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFileExplorer.Models
{
  public class Directory
  {
    public string FullName { get; init; } = "";
    public string Name { get; init; } = "";
    public string? Parent { get; init; }
    public int ItemCount
    {
      get
      {
        return SubDirectories.Count + Files.Count;
      }
    }
    public long SizeInBytes { get; set; }
    public IList<string> SubDirectories { get; } = new List<string>();
    public IList<File> Files { get; } = new List<File>();
  }
}
