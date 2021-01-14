using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebFileExplorer.Models;
using WebFileExplorer.Repositories;

namespace WebFileExplorer.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class DirectoriesController : ControllerBase
  {
    private readonly IDirectoryRepository _dirRepo;
    private readonly string _rootFilePath;

    public DirectoriesController(IConfiguration config, IDirectoryRepository dirRepo)
    {
      _dirRepo = dirRepo;
      _rootFilePath = config["RootFilePath"];
    }

    [HttpGet]
    public Directory Get([FromQuery] string? path)
    {
      return _dirRepo.GetContents(path != null ? path : "");
    }
  }
}
