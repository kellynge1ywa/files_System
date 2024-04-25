using System.ComponentModel.DataAnnotations;

namespace FolderService;

public class AddFolderDto
{
    [Required]
    public string FolderName { get; set; }

}
