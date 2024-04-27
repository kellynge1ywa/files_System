
using Newtonsoft.Json;

namespace FileService;

public class FolderServices : IFolder
{
    private readonly IHttpClientFactory _httpClientFactory;
    public FolderServices(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }
    public async Task<FolderDto> GetFolderById(Guid Id)
    {
        var client = _httpClientFactory.CreateClient("Folders");
        var repsonse = await client.GetAsync($"{Id}");
        var content = await repsonse.Content.ReadAsStringAsync();
        var responseDto = JsonConvert.DeserializeObject<ResponseDto>(content);
        if (repsonse.IsSuccessStatusCode)
        {
            return JsonConvert.DeserializeObject<FolderDto>(Convert.ToString(responseDto.Result));
        }
        return new FolderDto();

    }
}
