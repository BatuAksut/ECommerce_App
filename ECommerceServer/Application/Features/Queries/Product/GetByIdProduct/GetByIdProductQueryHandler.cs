using Application.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Product.GetByIdProduct
{
    public class GetByIdProductQueryHandler : IRequestHandler<GetByIdProductQueryRequest, GetByIdProductQueryResponse>
    {
        private readonly IProductReadRepository _productReadRepository;

        public GetByIdProductQueryHandler(IProductReadRepository productReadRepository)
        {
            _productReadRepository = productReadRepository;
        }

        public async Task<GetByIdProductQueryResponse> Handle(GetByIdProductQueryRequest request, CancellationToken cancellationToken)
        {
            // 1. Önce string ID'nin geçerli bir Guid olup olmadığını kontrol et
            if (!Guid.TryParse(request.Id, out Guid productGuid))
            {
                // Geçersiz ID formatı hatası dönebilir veya null dönebilirsiniz
                throw new Exception("Geçersiz ürün ID formatı!");
            }

            // 2. Sorguda dönüştürülmüş Guid nesnesini (productGuid) kullan
            var product = await _productReadRepository.Table
                .Include(p => p.ProductImageFiles)
                .Include(p => p.Orders)
                .FirstOrDefaultAsync(p => p.Id == productGuid, cancellationToken);

            if (product == null) return null;

            return new()
            {
                Name = product.Name,
                Price = product.Price,
                Stock = product.Stock,
      
            };
        }
    }
}
