using Application.Viewmodels.Products;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Validators.Products
{
    public class CreateProductValidator:AbstractValidator<VM_Create_Product>
    {
        public CreateProductValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty()
                .NotNull()
                .WithMessage("Please provide product name")
                .MaximumLength(150)
                .MinimumLength(2)
                .WithMessage("Please provide a name between 2-150 chars");

            RuleFor(p => p.Stock)
                .NotEmpty()
                .NotNull()
                .WithMessage("Please provide stock")
                .Must(s => s >= 0)
                .WithMessage("Stock has to be 0 or more");

            RuleFor(p => p.Price)
               .NotEmpty()
               .NotNull()
               .WithMessage("Please provide price")
               .Must(pr => pr >= 0)
               .WithMessage("Price has to be 0 or more");

        }
    }
}
