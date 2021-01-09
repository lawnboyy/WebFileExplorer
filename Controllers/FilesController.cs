using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using WebFileExplorer.Repositories;

namespace WebFileExplorer.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class FilesController : ControllerBase
  {
    private readonly IFileRepository _fileRepo;
    private readonly string _rootFilePath;
    private readonly string _downloadPath;

    public FilesController(IConfiguration config, IFileRepository fileRepo)
    {
      _fileRepo = fileRepo;
      _downloadPath = config["DownloadRootPath"];
      _rootFilePath = config["RootFilePath"];
    }

    [HttpGet]
    public IEnumerable<File> Search([FromQuery] string term)
    {
      return _fileRepo.Search(term, _rootFilePath);
    }

    [HttpPost("download")]
    public IActionResult Download([FromBody] File file)
    {
      string fullPath = $"{_rootFilePath}\\{file.FullName}";
      var downloadFilePath = $"{_downloadPath}\\downloads\\{file.Name}";

      if (_fileRepo.CopyFile(fullPath, downloadFilePath))
        return Ok(new { DownloadPath = $"downloads/{file.Name}" });
      else
        return StatusCode(500, "There was a problem downloading the file.");
    }
  }
}
