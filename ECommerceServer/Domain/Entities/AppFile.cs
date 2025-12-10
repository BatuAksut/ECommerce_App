using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class AppFile:BaseEntity
    {
        [NotMapped]
        override public DateTime UpdatedAt { get =>base.UpdatedAt; set =>base.UpdatedAt=value; }

        public string FileName { get; set; }
        public string Path { get; set; }

    }
}
