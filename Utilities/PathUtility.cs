using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFileExplorer.Utilities
{
  public static class PathUtility
  {
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

    public static string GetShortPath(string fullPath)
    {
      var parts = fullPath.Split('\\');
      return parts[parts.Length - 1];
    }
  }
}
