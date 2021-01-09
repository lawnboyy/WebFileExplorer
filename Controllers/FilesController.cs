using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
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
      return _fileRepo.SearchByIndex(term, _rootFilePath);
    }

    [HttpPost("download")]
    public IActionResult Download([FromBody] File file)
    {
      string fullPath = $"{_rootFilePath}\\{file.FullName}";
      var downloadFilePath = $"{_downloadPath}\\downloads\\{file.Name}";

      try
      {
        _fileRepo.CopyFile(fullPath, downloadFilePath);
        return Ok(new { DownloadPath = $"downloads/{file.Name}" });
      }
      catch (Exception)
      {
        return StatusCode(500, "There was a problem downloading the file.");
      }
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromQuery] string? path, [FromForm] IList<IFormFile> files)
    {
      if (files.Count > 0)
      {
        string fullPath = path != null ? $"{_rootFilePath}\\{path}" : _rootFilePath;
        await _fileRepo.AddFile(fullPath, files[0]);
      }
      return Ok();
    }
  }
}
