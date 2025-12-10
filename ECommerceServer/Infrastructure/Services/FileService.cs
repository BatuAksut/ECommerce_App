using Application.Services;
using Infrastructure.Operations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services
{
    public class FileService : IFileService
    {
        readonly IWebHostEnvironment _webHostEnvironment;

        public FileService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<List<(string fileName, string path)>> UploadAsync(string path, IFormFileCollection files)
        {
            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, path);

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            List<(string fileName, string path)> datas = new();
            List<bool> results = new();

            foreach (IFormFile file in files)
            {
                
                string newFileName = await FileRenameAsync(uploadPath, file.FileName);

                bool result = await CopyFileAsync(Path.Combine(uploadPath, newFileName), file);

                datas.Add((newFileName, Path.Combine(path, newFileName)));
                results.Add(result);
            }

            if (results.TrueForAll(r => r.Equals(true)))
            {
                return datas;
            }

            // Hata yönetimi (İsteğe bağlı olarak burada dosyaları geri silebilirsin)
            return null;
        }

        public async Task<bool> CopyFileAsync(string path, IFormFile file)
        {
            try
            {
                await using FileStream fileStream = new(path, FileMode.Create, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync: false);
                await file.CopyToAsync(fileStream);
                await fileStream.FlushAsync();
                return true;
            }
            catch (Exception ex)
            {
                // todo log
                throw ex;
            }
        }

        
        private async Task<string> FileRenameAsync(string path, string fileName)
        {
            
            string extension = Path.GetExtension(fileName);

            
            string oldName = Path.GetFileNameWithoutExtension(fileName);

            
            string regulatedName = NameOperation.CharacterRegulate(oldName);

           
            return await CheckFileNameRecursive(path, regulatedName, extension, 0);
        }

        // Recursive logic
        private async Task<string> CheckFileNameRecursive(string path, string regulatedName, string extension, int count)
        {
            return await Task.Run(() =>
            {
                string newFileName;

                
                if (count == 0)
                    newFileName = $"{regulatedName}{extension}";
                else
                    newFileName = $"{regulatedName}-{count}{extension}";

                
                string fullPath = Path.Combine(path, newFileName);

                if (File.Exists(fullPath))
                {
                    
                    return CheckFileNameRecursive(path, regulatedName, extension, count + 1);
                }
                else
                {
                   
                    return Task.FromResult(newFileName);
                }
            });
        }
    }
}