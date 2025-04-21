using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetEnv;
namespace api.Database
{
    public class database
    {
        public string cs;
        public database(){
            cs = Environment.GetEnvironmentVariable("DATABASE_URL");
        }
    }
}