using System;
using System.ComponentModel.DataAnnotations;

namespace WebFileExplorer
{
  public class File
  {
    [Key]
    public string FullName { get; init; } = "";
    public string Name { get; init; } = "";
    public long SizeInBytes { get; init; }
  }
}
