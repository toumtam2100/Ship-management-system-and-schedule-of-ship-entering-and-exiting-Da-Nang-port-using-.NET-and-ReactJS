using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using DPM.Applications.Services;

namespace DPM.Infrastructure.I18n
{
    internal class I18nService : II18nService
    {
        private class Translation
        {
            public Dictionary<string, string> Subject { get; set; } = new();
            public Dictionary<string, string> Message { get; set; } = new();
            public Dictionary<string, Dictionary<string, string>> Notification { get; set; } = new();
        }

        private readonly Dictionary<string, Translation> _translations = new();

        public I18nService()
        {
            var exeDir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
            var filePaths = Directory.GetFiles(exeDir + "/Locales", "*.json", SearchOption.TopDirectoryOnly);

            foreach (var filePath in filePaths)
            {
                var fileContent = File.ReadAllText(filePath);
                var locale = Path.GetFileNameWithoutExtension(filePath);
                var translations = JsonSerializer.Deserialize<Translation>(fileContent);

                if (translations == null)
                {
                    continue;
                }

                _translations.Add(locale, translations);
            }
        }

        public string Translate(string key, Dictionary<string, object> args, string? locale)
        {
            if (!key.StartsWith("t:"))
            {
                return key;
            }

            locale ??= CultureInfo.CurrentUICulture.TwoLetterISOLanguageName.ToLower();

            if (!_translations.ContainsKey(locale))
            {
                locale = "en";
            }

            var translation = _translations[locale];
            key = key.Replace("t:", "");
            var split = key.Split('.');

            string? message;

            try
            {
                message = split[0] switch
                {
                    "Subject" => translation.Subject[split[1]],
                    "Message" => translation.Message[split[1]],
                    "Notification" => translation.Notification[split[1]][split[2]],
                    _ => key,
                };
            }
            catch (KeyNotFoundException)
            {
                message = key;
            }

            foreach (var (argKey, argValue) in args)
            {
                if (argValue != null)
                {
                    message = message.Replace($"{{{argKey}}}", Translate(argValue.ToString()!, new(), locale));
                }
            }

            return message;
        }
    }

}
