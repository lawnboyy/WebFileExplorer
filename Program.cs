using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using WebFileExplorer.Models;
using WebFileExplorer.Repositories;

namespace WebFileExplorer
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = CreateHostBuilder(args).Build();

      CreateDbIfNotExists(host);

      // Build the file search index...
      Task.Run(async () =>
      {
        // Create a new scope to retrieve scoped services
        using (var scope = host.Services.CreateScope())
        {
          // Kick off the file indexing task...
          var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();
          var rootPath = config["RootFilePath"];
          var fileRepo = scope.ServiceProvider.GetRequiredService<IFileRepository>();
          await fileRepo.IndexFiles(rootPath);
        }
      });

      host.Run();
    }

    private static void CreateDbIfNotExists(IHost host)
    {
      using (var scope = host.Services.CreateScope())
      {
        var services = scope.ServiceProvider;
        try
        {
          var context = services.GetRequiredService<FileIndexContext>();
          DbInitializer.Initialize(context);
        }
        catch (Exception ex)
        {
          var logger = services.GetRequiredService<ILogger<Program>>();
          logger.LogError(ex, "An error occurred creating the DB.");
        }
      }
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}
