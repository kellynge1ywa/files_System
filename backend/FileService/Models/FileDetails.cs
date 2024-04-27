namespace FileService;

public class FileDetails
{
    public Guid Id { get; set; }

    public byte[] FileData { get; set; } = default!;

    public string FileName { get; set; } = "";
    public Guid UserId { get; set; }
    public Guid FolderId { get; set; }
    public DateTime DateAdded { get; set; }

}
