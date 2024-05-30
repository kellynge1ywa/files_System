using FolderService;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IFolder, FolderServices>();
builder.Services.AddScoped<IAppUser, UserServices>();

builder.Services.AddHttpClient("User", UserClient => UserClient.BaseAddress = new Uri(builder.Configuration.GetValue<string>("ServiceURL:UserBaseURL")));

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("myConnections"));
});

// builder.Services.AddCors(options => options.AddPolicy("MyPolicy", builder =>
// {
//     // builder.WithOrigins("http://localhost:4200");
//     builder.AllowAnyOrigin();
//     builder.AllowAnyHeader();
//     builder.AllowAnyMethod();
// }));
// builder.Services.AddCors(options => options.AddPolicy("MyPolicy", builder =>
// {

//     // builder.WithOrigins("http://localhost:4200");
//     builder.AllowAnyOrigin();
//     builder.AllowAnyMethod();
//     builder.AllowAnyMethod();
// }));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});
builder.AddSwaggerExtension();
builder.AddAuth();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMigrations();
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors();
app.Run();


