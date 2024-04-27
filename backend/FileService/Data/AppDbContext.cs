using Microsoft.EntityFrameworkCore;

namespace FileService;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public DbSet<FileDetails> Files { get; set; }

}
