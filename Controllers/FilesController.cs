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

    public FilesController(IConfiguration config, IFileRepository fileRepo)
    {
      _fileRepo = fileRepo;
      _rootFilePath = config["RootFilePath"];
    }

    [HttpGet]
    public IEnumerable<File> Search([FromQuery] string term)
    {
      return _fileRepo.Search(term);
    }

    [HttpGet("download")]
    public async Task<FileResult> Download([FromQuery] string path)
    {
      var fileBytes = await _fileRepo.RetrieveFile(path);
      return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, path);
    }
  }
}
