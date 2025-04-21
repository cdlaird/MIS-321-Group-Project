using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetEnv;
namespace api
{
    public class database
    {
        public string cs;
        public database(){
            Env.Load();
            cs = Environment.GetEnvironmentVariable("DATABASE_URL");
            // cs = "hello";
        }
    }
}