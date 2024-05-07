using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FileService;

public class BufferFileDto : PageModel
{
    [BindProperty]
    public UploadFileDto UploadFile { get; set; } = default!;
}
