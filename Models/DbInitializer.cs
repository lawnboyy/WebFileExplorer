using System;
using System.Linq;

namespace WebFileExplorer.Models
{
  public static class DbInitializer
  {
    public static void Initialize(FileIndexContext context)
    {
      context.Database.EnsureCreated();
    }
  }
}