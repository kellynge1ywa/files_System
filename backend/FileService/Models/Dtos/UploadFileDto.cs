using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace FileService;

public class UploadFileDto
{
    [Required]
    [Display(Name = "File")]
    public IFormFile File { get; set; } = default!;



}
