using Application.Abstractions.Storage.Local;
using Microsoft.AspNetCore.Hosting; 
using Microsoft.AspNetCore.Http;
using System.IO; 
using Infrastructure.Operations; 

namespace Infrastructure.Services.Storage.Local
{
    public class LocalStorage : ILocalStorage
    {
        readonly IWebHostEnvironment _webHostEnvironment; 

   
        public LocalStorage(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        
        public async Task<List<(string fileName, string pathOrContainer)>> UploadAsync(string pathOrContainer, IFormFileCollection files)
        {
        
            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, pathOrContainer);

            
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            List<(string fileName, string pathOrContainer)> datas = new();
            List<bool> results = new();

            foreach (IFormFile file in files)
            {
                
                string newFileName = await FileRenameAsync(uploadPath, file.FileName);

                
                bool result = await CopyFileAsync(Path.Combine(uploadPath, newFileName), file);

                datas.Add((newFileName, Path.Combine(pathOrContainer, newFileName)));
                results.Add(result);
            }

            if (results.TrueForAll(r => r.Equals(true)))
            {
                return datas;
            }

           
            return null;
        }

      
        private async Task<bool> CopyFileAsync(string path, IFormFile file) 
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
                    // Recursion
                    return CheckFileNameRecursive(path, regulatedName, extension, count + 1);
                }
                else
                {
                    return Task.FromResult(newFileName);
                }
            });
        }




        public Task DeleteAsync(string pathOrContainer, string fileName)
        {
            string fullPath = Path.Combine(_webHostEnvironment.WebRootPath, pathOrContainer, fileName);
            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
            return Task.CompletedTask;
        }

        public List<string> GetFiles(string pathOrContainer)
        {
            string fullPath = Path.Combine(_webHostEnvironment.WebRootPath, pathOrContainer);
            if (Directory.Exists(fullPath))
            {

                return Directory.GetFiles(fullPath).Select(f => Path.GetFileName(f)).ToList();
            }
            return new List<string>();
        }

        public bool HasFile(string pathOrContainer, string fileName)
        {
            string fullPath = Path.Combine(_webHostEnvironment.WebRootPath, pathOrContainer, fileName);
            return File.Exists(fullPath);
        }


        public string StorageName => "Local";
    }
}