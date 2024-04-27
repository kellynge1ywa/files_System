using FileService;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IFiles, FileServices>();
builder.Services.AddScoped<IFolder, FolderServices>();

builder.Services.AddHttpClient("Folders", k => k.BaseAddress = new Uri(builder.Configuration.GetValue<string>("ServiceURL:FolderService")));


builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("myConnections"));
});

builder.AddAuth();
builder.AddSwaggerExtension();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseMigrations();
app.UseAuthentication();
app.UseAuthorization();
app.Run();

