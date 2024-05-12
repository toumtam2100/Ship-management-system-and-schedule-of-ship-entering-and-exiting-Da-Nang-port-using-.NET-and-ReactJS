namespace DPM.Applications.Services
{
    public interface II18nService
    {
        public string Translate(string key, Dictionary<string, object> args, string? locale = null);
    }
}
