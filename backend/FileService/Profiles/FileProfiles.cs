using AutoMapper;

namespace FileService;

public class FileProfiles : Profile
{
    public FileProfiles()
    {
        CreateMap<UploadFileDto, FileDetails>().ReverseMap();
    }

}
