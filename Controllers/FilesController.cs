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
using WebFileExplorer.Utilities;

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
    public async Task<IActionResult> Search([FromQuery] string term)
    {
      try
      {
        return Ok(await _fileRepo.Search(term, _rootFilePath));
      }
      catch (Exception)
      {
        return StatusCode(500, "There was a problem searching the files.");
      }
    }

    [HttpPost("download")]
    public IActionResult Download([FromBody] File file)
    {
      try
      {
        string fullPath = $"{_rootFilePath}\\{file.FullName}";
        string generatedName = PathUtility.AddTimestamp(file.Name);
        
        var downloadFilePath = $"{_downloadPath}\\downloads\\{generatedName}";
        
        // If the downloads directory doesn't exist, then create it.
        var fileInfo = new FileInfo(downloadFilePath);
        fileInfo.Directory?.Create();
        
        _fileRepo.CopyFile(fullPath, downloadFilePath);

        return Ok(new { DownloadPath = $"downloads/{generatedName}" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, "There was a problem downloading the file.");
      }
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromQuery] string? path, [FromForm] IList<IFormFile> files)
    {
      try
      {
        if (files.Count > 0)
        {
          string fullPath = path != null ? $"{_rootFilePath}\\{path}" : _rootFilePath;
          await _fileRepo.AddFile(fullPath, files[0]);
        }
        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "There was a problem uploaing the file.");
      }
    }
  }
}
