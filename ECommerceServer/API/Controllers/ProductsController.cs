using Application.Abstractions.Storage;
using Application.Abstractions.Storage.Local;
using Application.Repositories;
using Application.Repositories.File;
using Application.Repositories.InvoiceFiles;
using Application.Repositories.ProductImageFiles;
using Application.RequestParameters;
using Application.Viewmodels.Products;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductWriteRepository _productWriteRepository;
        private readonly IProductReadRepository _productReadRepository;
        private readonly IOrderWriteRepository _orderWriteRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;
        readonly IFileWriteRepository _fileWriteRepository;
        readonly IFileReadRepository _fileReadRepository;
        readonly IProductImageFileWriteRepository _productImageFileWriteRepository;
        readonly IProductImageFileReadRepository _productImageFileReadRepository;
        readonly IInvoiceFileReadRepository _invoiceFileReadRepository;
        readonly IInvoiceFileWriteRepository _invoiceFileWriteRepository;
        private readonly IStorageService _storageService;
        private readonly IConfiguration _configuration;


        public ProductsController(IProductWriteRepository productWriteRepository,
            IProductReadRepository productReadRepository,
            IOrderWriteRepository orderWriteRepository,
            IWebHostEnvironment webHostEnvironment,
            IStorageService storageService,
            IFileWriteRepository fileWriteRepository,
            IFileReadRepository fileReadRepository,
            IProductImageFileWriteRepository productImageFileWriteRepository,
            IProductImageFileReadRepository productImageFileReadRepository,
            IInvoiceFileReadRepository invoiceFileReadRepository,
            IInvoiceFileWriteRepository invoiceFileWriteRepository,
            IConfiguration configuration

            )
        {
            _productWriteRepository = productWriteRepository;
            _productReadRepository = productReadRepository;
            _orderWriteRepository = orderWriteRepository;
            _webHostEnvironment = webHostEnvironment;
            _storageService = storageService;
            _fileWriteRepository = fileWriteRepository;
            _fileReadRepository = fileReadRepository;
            _productImageFileWriteRepository = productImageFileWriteRepository;
            _productImageFileReadRepository = productImageFileReadRepository;
            _invoiceFileReadRepository = invoiceFileReadRepository;
            _invoiceFileWriteRepository = invoiceFileWriteRepository;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] Pagination pagination)
        {
            var totalCount = _productReadRepository.GetAll(false).Count();
            var products = _productReadRepository.GetAll(false).Select(p => new
            {
                p.Id,
                p.Name,
                p.Price,
                p.Stock,
                p.CreatedAt,
                p.UpdatedAt
            }).Skip(pagination.Page * pagination.Size).Take(pagination.Size).ToList();
            return Ok(new
            {
                totalCount,
                products
            });
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
            var product = await _productReadRepository.GetByIdAsync(id, false);
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
            return Ok();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Upload(string id)
        {

            List<(string fileName, string pathOrContainerName)> result = await _storageService.UploadAsync("photos", Request.Form.Files);

            var product = await _productReadRepository.GetByIdAsync(id);
            await _productImageFileWriteRepository.AddRangeAsync(result.Select(r => new ProductImageFile
            {
                FileName = r.fileName,
                Path = r.pathOrContainerName,
                Storage = _storageService.StorageName,
                Products = new List<Product> { product }
            }).ToList());
            await _productImageFileWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetProductImages(string id)
        {
            var product = await _productReadRepository.Table.Include(p => p.ProductImageFiles).FirstOrDefaultAsync(p => p.Id == Guid.Parse(id));
            return Ok(product.ProductImageFiles.Select(p => new
            {
                p.FileName,
                p.Id,
                Path = $"{_configuration["BaseStorageUrl"]}/{p.Path}",
            }));
        }


        [HttpDelete]
        [Route("[action]/{id}")]
        public async Task<IActionResult> DeleteProductImage([FromRoute] string id, [FromQuery] string imageId)
        {
            var product = await _productReadRepository.Table.Include(p => p.ProductImageFiles).FirstOrDefaultAsync(p => p.Id == Guid.Parse(id));
            var imageToDelete = product.ProductImageFiles.FirstOrDefault(p => p.Id == Guid.Parse(imageId));
           

            _productImageFileWriteRepository.Remove(imageToDelete);
            await _productImageFileWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
