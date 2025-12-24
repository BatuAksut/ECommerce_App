using Application.Repositories;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Product.UpdateProduct
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommandRequest, UpdateProductCommandResponse>
    {
        private IProductReadRepository _productReadRepository;
        private IProductWriteRepository _productWriteRepository;

        public UpdateProductCommandHandler(IProductReadRepository productReadRepository, IProductWriteRepository productWriteRepository)
        {
            _productReadRepository = productReadRepository;
            _productWriteRepository = productWriteRepository;
        }

        public async Task<UpdateProductCommandResponse> Handle(UpdateProductCommandRequest request, CancellationToken cancellationToken)
        {
            var productToUpdate = await _productReadRepository.GetByIdAsync(request.Id);
           
            productToUpdate.Name = request.Name;
            productToUpdate.Stock = request.Stock;
            productToUpdate.Price = request.Price;
            _productWriteRepository.Update(productToUpdate);
            await _productWriteRepository.SaveAsync();
            return new UpdateProductCommandResponse();
        }
    }
}
