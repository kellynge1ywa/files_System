namespace FileService;

public class Helpers
{
    public static string GetUniqueName(string fileName)
    {
        fileName = Path.GetFileName(fileName);
        return string.Concat(Path.GetFileNameWithoutExtension(fileName), "_", Guid.NewGuid().ToString().AsSpan(0, 6), Path.GetExtension(fileName));
    }

}
