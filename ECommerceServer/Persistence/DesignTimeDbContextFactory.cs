using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
 
        public AppDbContext CreateDbContext(string[] args)
        {

            DbContextOptionsBuilder<AppDbContext> dbContextOptionsBuilder = new ();
            dbContextOptionsBuilder.UseNpgsql(Configuration.ConnectionString);
            return new AppDbContext(dbContextOptionsBuilder.Options);   
        }
    }
}
