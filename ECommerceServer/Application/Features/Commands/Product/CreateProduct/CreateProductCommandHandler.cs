using Application.Repositories;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Product.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommandRequest, CreateProductCommandResponse>
    {
        readonly IProductWriteRepository _productWriteRepository;
        public CreateProductCommandHandler(IProductWriteRepository productWriteRepository)
        {
            _productWriteRepository = productWriteRepository;
        }
        public async Task<CreateProductCommandResponse> Handle(CreateProductCommandRequest request, CancellationToken cancellationToken)
        {

            // Avoiding namespace conflict by using full namespace for Product entity
            var productToAdd = new Domain.Entities.Product
            {
                Name = request.Name,
                Stock = request.Stock,
                Price = request.Price
            };
            await _productWriteRepository.AddAsync(productToAdd);
            await _productWriteRepository.SaveAsync();
            return new();
        }
    }
}
