using System.ComponentModel.DataAnnotations;

namespace Files;

public class AddFolderDto
{
    [Required]
    public string FolderName { get; set; }
}
