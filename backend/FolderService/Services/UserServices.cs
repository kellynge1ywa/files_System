
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace FolderService;

public class UserServices : IAppUser
{
    private readonly IHttpClientFactory _httpClientFactory;
    public UserServices(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<AppUserDto> GetUser(Guid userId, string token)
    {
        var client = _httpClientFactory.CreateClient("User");
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        var response = await client.GetAsync(userId.ToString());
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonConvert.DeserializeObject<ResponseDto>(content);
        if (response.IsSuccessStatusCode)
        {
            var user = JsonConvert.DeserializeObject<AppUserDto>(responseDto.Result.ToString());
            return user;
        }
        return new AppUserDto();
    }
}
