using System;

namespace WebFileExplorer.Utilities
{
  public class PathUtility
  {
    public static string GetShortPath(string fullPath)
    {
      var parts = fullPath.Split('\\');
      return parts[parts.Length - 1];
    }

    public static string StripRoot(string fullPath, string rootPath)
    {
      var parts = fullPath.Split(rootPath);
      // Remove the initial slashes
      if (parts.Length > 0)
      {
        return parts[1].Substring(1);
      }
      return "";
    }

    public static string AddTimestamp(string fileName)
    {
      var extensionIndex = fileName.LastIndexOf('.');
      var name = fileName.Substring(0, extensionIndex + 1);
      var extension = fileName.Substring(extensionIndex);

      return $"{name}{DateTime.UtcNow.Ticks}{extension}";
    }
  }
}
