    using Application.Abstractions.Azure;
    using Application.Abstractions.Storage;
    using Azure.Storage.Blobs;
    using Azure.Storage.Blobs.Models;
    using Infrastructure.Operations;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Configuration;

    namespace Infrastructure.Services.Storage.Azure
    {
        public class AzureStorage : IAzureStorage
        {
            public string StorageName => "Azure";

            private readonly BlobServiceClient _blobServiceClient;

            
            private BlobContainerClient _blobContainerClient;

            public AzureStorage(IConfiguration configuration)
            {
                _blobServiceClient = new BlobServiceClient(configuration["Storage:Azure"]);
            }

            public async Task<List<(string fileName, string pathOrContainer)>> UploadAsync(string pathOrContainer, IFormFileCollection files)
            {
                _blobContainerClient = _blobServiceClient.GetBlobContainerClient(pathOrContainer);

                await _blobContainerClient.CreateIfNotExistsAsync();
                await _blobContainerClient.SetAccessPolicyAsync(PublicAccessType.BlobContainer);

                List<(string fileName, string pathOrContainer)> datas = new();

                foreach (IFormFile file in files)
                {
                    string fileNewName = await FileRenameAsync(pathOrContainer, file.FileName);
                    BlobClient blobClient = _blobContainerClient.GetBlobClient(fileNewName);

                    await blobClient.UploadAsync(file.OpenReadStream(), overwrite: true);
                    datas.Add((fileNewName, $"{pathOrContainer}/{fileNewName}"));
                }

                return datas;
            }

            public async Task DeleteAsync(string pathOrContainer, string fileName)
            {
                _blobContainerClient = _blobServiceClient.GetBlobContainerClient(pathOrContainer);
                BlobClient blobClient = _blobContainerClient.GetBlobClient(fileName);
                await blobClient.DeleteIfExistsAsync();
            }

            public List<string> GetFiles(string pathOrContainer)
            {
                _blobContainerClient = _blobServiceClient.GetBlobContainerClient(pathOrContainer);
                return _blobContainerClient.GetBlobs().Select(b => b.Name).ToList();
            }

        public bool HasFile(string pathOrContainer, string fileName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(pathOrContainer);
            BlobClient blobClient = containerClient.GetBlobClient(fileName);

            
            return blobClient.Exists().Value;
        }

        // --- YARDIMCI METOTLAR ---

        private async Task<string> FileRenameAsync(string pathOrContainer, string fileName)
            {
                string extension = Path.GetExtension(fileName);
                string oldName = Path.GetFileNameWithoutExtension(fileName);
                string regulatedName = NameOperation.CharacterRegulate(oldName);

                return await CheckFileNameRecursive(pathOrContainer, regulatedName, extension, 0);
            }

            private async Task<string> CheckFileNameRecursive(string pathOrContainer, string regulatedName, string extension, int count)
            {
                string newFileName;
                if (count == 0)
                    newFileName = $"{regulatedName}{extension}";
                else
                    newFileName = $"{regulatedName}-{count}{extension}";

                _blobContainerClient = _blobServiceClient.GetBlobContainerClient(pathOrContainer);
                BlobClient blobClient = _blobContainerClient.GetBlobClient(newFileName);

                if (await blobClient.ExistsAsync())
                {
                    return await CheckFileNameRecursive(pathOrContainer, regulatedName, extension, count + 1);
                }
                else
                {
                    return newFileName;
                }
            }
        }
    }