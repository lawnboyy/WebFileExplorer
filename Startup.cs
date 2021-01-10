using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SpaServices;
using WebFileExplorer.Repositories;
using WebFileExplorer.Models;
using Microsoft.EntityFrameworkCore;

namespace WebFileExplorer
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // Add database context for file indexing...
      services.AddDbContext<FileIndexContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

      // Add repo interfaces
      services.AddScoped<IDirectoryRepository, DirectoryRepository>();
      services.AddScoped<IFileRepository, FileRepository>();

      services.AddControllers();
      services.AddSpaStaticFiles(config => config.RootPath = "wwwroot");
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();
      app.UseFileServer();
      app.UseRouting();


      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
        endpoints.MapFallbackToFile("/index.html");
      });
    }
  }
}
