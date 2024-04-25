using AutoMapper;

namespace FolderService;

public class FolderProfiles : Profile
{
    public FolderProfiles()
    {
        CreateMap<AddFolderDto, Folder>().ReverseMap();

    }

}
