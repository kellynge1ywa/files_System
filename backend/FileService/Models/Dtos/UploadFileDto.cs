namespace FileService;

public class UploadFileDto
{
    public IFormFile File { get; set; } = default!;


    public DateTime DateAdded { get; set; }

}
