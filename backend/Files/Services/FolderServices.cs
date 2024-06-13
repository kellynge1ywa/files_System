
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Files;

public class FolderServices : Ifolder
{
    private readonly AppDbContext _dbContext;
    private readonly IMapper _mapper;
    public FolderServices(AppDbContext dbContext, IMapper mapper)
    {

        _dbContext = dbContext;
        _mapper = mapper;
    }
    public async Task<string> AddFolder(Folder newFolder)
    {


        await _dbContext.Folders.AddAsync(newFolder);
        await _dbContext.SaveChangesAsync();
        return "Folder added successfully!!";

    }

    public async Task<string> DeleteFolder(Guid Id)
    {
        var deleteFolder = await GetFolder(Id);
        if (deleteFolder == null)
        {
            return "Folder not found";
        }
        _dbContext.Folders.Remove(deleteFolder);
        await _dbContext.SaveChangesAsync();
        return "Folder update successfully";
    }

    public async Task<Folder> GetFolder(Guid Id)
    {
        return await _dbContext.Folders.Where(k => k.Id == Id).FirstOrDefaultAsync();
    }

    public async Task<List<Folder>> GetFolders()
    {
        return await _dbContext.Folders.ToListAsync();
    }

    public Task<UserDto> GetUser(Guid userId)
    {
        throw new NotImplementedException();
    }

    public async Task<List<Folder>> GetUserFolders(Guid UserId)
    {
        return await _dbContext.Folders.Where(k => k.UserId == UserId).ToListAsync();
    }

    public async Task<string> UpdateFolder(Folder uptFolder)
    {
        _dbContext.Folders.Update(uptFolder);
        await _dbContext.SaveChangesAsync();
        return "Folder updated!!";

    }}
