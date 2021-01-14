using System;

namespace WebFileExplorer.Utilities
{
  /// <summary>
  /// Utility class for working with paths and file names.
  /// </summary>
  public class PathUtility
  {
    /// <summary>
    /// Pulls the file name out of a given path string.
    /// </summary>
    /// <param name="fullPath">The full file path</param>
    /// <returns>The file name</returns>
    public static string GetShortPath(string fullPath)
    {
      var parts = fullPath.Split('\\');
      return parts[parts.Length - 1];
    }

    /// <summary>
    /// Strips the root folder out of the path and returns
    /// the relative path.
    /// </summary>
    /// <param name="fullPath">The full path of a file or directory</param>
    /// <param name="rootPath">The root directory path</param>
    /// <returns>Relative path</returns>
    public static string StripRoot(string fullPath, string rootPath)
    {
      var parts = fullPath.ToLower().Split(rootPath.ToLower());
      // Remove the initial slashes
      if (parts.Length > 0)
      {
        return parts[1].Substring(1);
      }
      return "";
    }

    /// <summary>
    /// Takes a file name and renames it with a timestamp.
    /// </summary>
    /// <param name="fileName">The original file name</param>
    /// <returns>The file name with a timestamp added</returns>
    public static string AddTimestamp(string fileName)
    {
      var extensionIndex = fileName.LastIndexOf('.');
      if (extensionIndex >= 0)
      {
        var name = fileName.Substring(0, extensionIndex + 1);
        var extension = fileName.Substring(extensionIndex);
        return $"{name}{DateTime.UtcNow.Ticks}{extension}";
      }

      // There is no extension
      return $"{fileName}-{DateTime.UtcNow.Ticks}";
    }
  }
}
