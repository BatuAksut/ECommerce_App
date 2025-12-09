using Application.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class FileService : IFileService
    {
        readonly IWebHostEnvironment _webHostEnvironment;

        public async Task<bool> CopyFileAsync(string path, IFormFile file)
        {
            try
            {
                
                await using FileStream fileStream = new(path, FileMode.Create, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync: false);

                await fileStream.FlushAsync();
                return true;
            }
            catch (Exception)
            {
                //todo log
                throw;
            }
        }

        public Task<string> FileRenameAsync(string fileName)
        {
            throw new NotImplementedException();
        }

        public async Task<List<(string fileName, string path)>> UploadAsync(string path, IFormFileCollection files)
        {
            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, path);

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            List<(string fileName, string path)> datas = new List<(string fileName, string path)>();


            List<bool> results = new List<bool>();
            foreach (IFormFile file in files)
            {
                    
                string newName = await FileRenameAsync(file.FileName);
                bool result = await CopyFileAsync($"{uploadPath}\\{newName}",file);
                datas.Add((newName, $"{uploadPath}\\{newName}"));
                results.Add(result);
            }
            if (results.TrueForAll(r => r.Equals(true)))
            {
                return datas;
            }

            // todo throw exception
            return null;
        }
    }
}
