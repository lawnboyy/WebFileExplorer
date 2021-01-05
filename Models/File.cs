using System;

namespace WebFileExplorer
{
  public class File
  {
    public string Name { get; init; } = "";
    public string FullName { get; init; } = "";
    public long SizeInBytes { get; init; }
  }
}
