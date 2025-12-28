using Application;
using Application.Validators.Products;
using FluentValidation.AspNetCore;
using Infrastructure;
using Infrastructure.Filters;
using Infrastructure.Services.Storage.Azure;
using Infrastructure.Services.Storage.Local;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;
using static Infrastructure.ServiceRegistration;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers(opt=>opt.Filters.Add<ValidationFilter>()).AddFluentValidation(con=>con.RegisterValidatorsFromAssemblyContaining<CreateProductValidator>()).ConfigureApiBehaviorOptions(opt=>opt.SuppressModelStateInvalidFilter=true);


builder.Services.AddPersistenceServices();
builder.Services.AddInfrastructureServices();
builder.Services.AddApplicationServices();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("Admin",opt =>
    {
        opt.TokenValidationParameters = new()
        {
            ValidateAudience = true,
            ValidateIssuer = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidAudience = builder.Configuration["Token:Audience"],
            ValidIssuer = builder.Configuration["Token:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:SecurityKey"]))
        };
    });


builder.Services.AddStorage<AzureStorage>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseCors();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
