using Application.Repositories.ProductImageFiles;
using Domain.Entities;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories.ProductImageFiles;

public class ProductImageFileWriteRepository:WriteRepository<ProductImageFile>, IProductImageFileWriteRepository
{
    public ProductImageFileWriteRepository(AppDbContext context) : base(context)
    {
    }

}