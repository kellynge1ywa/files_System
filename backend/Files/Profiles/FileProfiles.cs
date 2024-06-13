using AutoMapper;

namespace Files;

public class FileProfiles:Profile
{
    public FileProfiles()
    {
        CreateMap<AddFolderDto, Folder>().ReverseMap();
         CreateMap<UploadFileDto, Files>().ReverseMap();
    }

}
