using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Product.GetByIdProduct
{
    public class GetByIdProductQueryResponse 
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public int Stock { get; set; }
        public ICollection<Order> Orders { get; set; }

        public ICollection<Domain.Entities.ProductImageFile> ProductImageFiles { get; set; }
    }
}
