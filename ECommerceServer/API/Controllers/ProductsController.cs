using Application.Repositories;
using Application.Viewmodels.Products;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductWriteRepository _productWriteRepository;
        private readonly IProductReadRepository _productReadRepository;
        private readonly IOrderWriteRepository _orderWriteRepository;

        public ProductsController(IProductWriteRepository productWriteRepository, IProductReadRepository productReadRepository, 
            IOrderWriteRepository orderWriteRepository)
        {
            _productWriteRepository = productWriteRepository;
            _productReadRepository = productReadRepository;
            _orderWriteRepository = orderWriteRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var products = _productReadRepository.GetAll();
            return Ok(products);
        }
        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Product model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var productToAdd = new Product
            {
                Name = model.Name,
                Stock = model.Stock,
                Price = model.Price
            };
            await _productWriteRepository.AddAsync(productToAdd);
            await _productWriteRepository.SaveAsync();
            return CreatedAtAction(nameof(GetById), new { id = productToAdd.Id }, productToAdd);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var product = await _productReadRepository.GetByIdAsync(id,false);
            return Ok(product);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Put(string id, VM_Update_Product model)
        {
            var productToUpdate = await _productReadRepository.GetByIdAsync(id);
            if (productToUpdate == null)
            {
                return NotFound();
            }
            productToUpdate.Name = model.Name;
            productToUpdate.Stock = model.Stock;
            productToUpdate.Price = model.Price;
            _productWriteRepository.Update(productToUpdate);
            await _productWriteRepository.SaveAsync();
            return NoContent();
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var productToDelete = await _productReadRepository.GetByIdAsync(id);
            if (productToDelete == null)
            {
                return NotFound();
            }
            _productWriteRepository.Remove(productToDelete);
            await _productWriteRepository.SaveAsync();
            return NoContent();
        }
    }

}
