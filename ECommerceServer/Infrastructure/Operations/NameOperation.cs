using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace Infrastructure.Operations
{
    public static class NameOperation
    {
        public static string CharacterRegulate(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return string.Empty;
            }
              

            string normalizedString = name.Normalize(NormalizationForm.FormD);
            StringBuilder stringBuilder = new StringBuilder();

            foreach (char c in normalizedString)
            {
      
                UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    stringBuilder.Append(c);
                }
            }

       
            string result = stringBuilder.ToString().Normalize(NormalizationForm.FormC).ToLowerInvariant();


            result = Regex.Replace(result, @"[^a-z0-9\s-]", ""); 
            result = Regex.Replace(result, @"\s+", "-").Trim(); 
            result = Regex.Replace(result, @"-+", "-");        

            return result;
        }
    }
}