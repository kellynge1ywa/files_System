using Microsoft.EntityFrameworkCore;

namespace Files;

public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
    public DbSet<Folder> Folders { get; set; }
    public DbSet<Files> Files { get; set; }

}
