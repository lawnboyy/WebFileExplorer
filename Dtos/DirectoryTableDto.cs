using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFileExplorer.Models;

namespace WebFileExplorer.Dtos
{
  public record DirectoryTableDto
  {
    public string Root { get; private set; }
    public IDictionary<string, Directory> DirectoryLookup { get; private set; }

    public DirectoryTableDto(string root, IDictionary<string, Directory> directoryLookup)
    {
      Root = root;
      DirectoryLookup = directoryLookup;
    }
  }
}
