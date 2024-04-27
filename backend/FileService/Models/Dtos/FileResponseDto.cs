namespace FileService;

public class FileResponseDto
{
    public Guid Id { get; set; }

    public string FilePath { get; set; } = "";
    public Guid UserId { get; set; }
    public Guid FolderId { get; set; }
    public DateTime DateAdded { get; set; }

}
