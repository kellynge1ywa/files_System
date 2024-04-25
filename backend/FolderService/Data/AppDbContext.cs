using Microsoft.EntityFrameworkCore;

namespace FolderService;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
    public DbSet<Folder> Folders { get; set; }

}
