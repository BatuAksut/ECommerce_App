using Application.Abstractions.Azure;
using Application.Abstractions.Storage;
using Application.Abstractions.Storage.Local;
using Infrastructure.Services;
using Infrastructure.Services.Storage;
using Infrastructure.Services.Storage.Azure;
using Infrastructure.Services.Storage.Local;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public static partial class ServiceRegistration
    {
        public static void AddStorage(this IServiceCollection serviceCollection, StorageType storageType)
        {
            switch (storageType)
            {
                case StorageType.Local:
                    serviceCollection.AddScoped<ILocalStorage, LocalStorage>();
                    serviceCollection.AddScoped<IStorage, LocalStorage>();
                    break;
                case StorageType.Azure:
                    serviceCollection.AddScoped<IAzureStorage, AzureStorage>();
                    // serviceCollection.AddScoped<IStorage, AzureStorage>();
                    break;
             
                default:
                    //  (Best Practice)
                    serviceCollection.AddScoped<ILocalStorage, LocalStorage>();
                    serviceCollection.AddScoped<IStorage, LocalStorage>();
                    break;
            }
        }
        public static void AddStorage<T>(this IServiceCollection serviceCollection) where T : class, IStorage
        {
       
            serviceCollection.AddScoped<IStorage, T>();
        }

        public static void AddInfrastructureServices(this IServiceCollection serviceCollection)
        {

            serviceCollection.AddScoped<IStorageService, StorageService>();
        }
    }
}
