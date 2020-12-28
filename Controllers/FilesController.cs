using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFileExplorer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilesController : ControllerBase
    {
        private static readonly string[] _files = new[]
        {
            "file1.txt", "doc3.docx", "test.txt", "Presentation.ppt"
        };

        private readonly ILogger<FilesController> _logger;

        public FilesController(ILogger<FilesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<File> Get()
        {
            var rng = new Random();
      return _files.Select(f => new File
            {
             Name  = f
            })
            .ToArray();
        }
    }
}
