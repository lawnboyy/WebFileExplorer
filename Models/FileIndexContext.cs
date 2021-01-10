using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebFileExplorer.Models
{
  public class FileIndexContext : DbContext
  {
    public FileIndexContext(DbContextOptions<FileIndexContext> options) : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<File>()
          .HasIndex(f => f.Name);
    }

    public DbSet<File> Files => Set<File>();
  }
}
