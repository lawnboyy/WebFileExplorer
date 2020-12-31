using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFileExplorer.Dtos;
using WebFileExplorer.Models;
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

    [HttpGet("all")]
    public DirectoryTableDto Get()
    {
      var result = _fileRepo.GetAllContents(_rootFilePath);
      return new DirectoryTableDto(_rootFilePath, result);
    }

    [HttpGet]
    public FileDirectory Get([FromBody] string path)
    {
      return _fileRepo.GetContents(path);
    }

    [HttpGet("test")]
    public Dictionary<int, string> Test()
    {
      var test = new Dictionary<int, string>();
      test.Add(1, "one");
      test.Add(2, "two");
      test.Add(3, "three");

      return test;
    }
  }
}
