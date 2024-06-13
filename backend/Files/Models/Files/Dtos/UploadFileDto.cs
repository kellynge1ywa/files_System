using System.ComponentModel.DataAnnotations;

namespace Files;

public class UploadFileDto
{
     [Required]
    [Display(Name = "File")]
    public IFormFile File { get; set; } = default!;
}
