
namespace DPM.Infrastructure.I18n
{
    public interface II18nService
    {
        public string Translate(string key, Dictionary<string, object> args, string? locale = null);
    }
}
