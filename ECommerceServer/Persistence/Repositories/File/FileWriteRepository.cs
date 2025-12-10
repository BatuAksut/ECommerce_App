using Application.Repositories.File;
using Domain.Entities;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories.File;

public class FileWriteRepository:WriteRepository<AppFile>, IFileWriteRepository
{
    public FileWriteRepository(AppDbContext context) : base(context)
    {
    }


}