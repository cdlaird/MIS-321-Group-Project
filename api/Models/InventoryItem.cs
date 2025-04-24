using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySqlConnector;
using api;
using api.Database;
namespace api.Models
{
    public class InventoryItem
    {
        public int BookId { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string AuthorFirst { get; set; }
        public string AuthorLast { get; set; }
        public string Genre { get; set; }
        public int PageCount { get; set; }
        public decimal Price { get; set; }
        public string InStock { get; set; }
        public string IsDeleted { get; set; }


         private readonly database _db = new();
// get all books
          public async Task<List<InventoryItem>> GetAllAsync()
        {
            const string sql = @"
                SELECT bookid, isbn, title, authorfirst, authorlast,
                       genre, pagecount, price, instock, isdeleted
                  FROM book
                 WHERE isdeleted = 'n';";
            var list = new List<InventoryItem>();
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            await using var r = await cmd.ExecuteReaderAsync();
            while (await r.ReadAsync())
            {
                list.Add(new InventoryItem {
                    BookId      = r.GetInt32("bookid"),
                    ISBN        = r.GetString("isbn"),
                    Title       = r.GetString("title"),
                    AuthorFirst = r.GetString("authorfirst"),
                    AuthorLast  = r.GetString("authorlast"),
                    Genre       = r.GetString("genre"),
                    PageCount   = r.GetInt32("pagecount"),
                    Price = r.GetDecimal("price"),
                    InStock     = r.GetString("instock"),
                    IsDeleted   = r.GetString("isdeleted")
                });
            }
            return list;
        }
// get a book
        public async Task<InventoryItem> GetByIdAsync(int id)
        {
            const string sql = @"
                SELECT bookid, isbn, title, authorfirst, authorlast,
                       genre, pagecount, price, instock, isdeleted
                  FROM book
                 WHERE bookid = @id
                   AND isdeleted = 'n';";
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@id", id);
            await using var r = await cmd.ExecuteReaderAsync();
            if (await r.ReadAsync())
            {
                return new InventoryItem {
                    BookId      = r.GetInt32("bookid"),
                    ISBN        = r.GetString("isbn"),
                    Title       = r.GetString("title"),
                    AuthorFirst = r.GetString("authorfirst"),
                    AuthorLast  = r.GetString("authorlast"),
                    Genre       = r.GetString("genre"),
                    PageCount   = r.GetInt32("pagecount"),
                    Price = r.GetDecimal("price"),
                    InStock     = r.GetString("instock"),
                    IsDeleted   = r.GetString("isdeleted")
                };
            }
            return null;
        }
// insert a book
        public async Task AddAsync(InventoryItem it)
        {
            const string sql = @"
                INSERT INTO book
                    (isbn, title, authorfirst, authorlast,
                     genre, pagecount, price, instock, isdeleted)
                VALUES
                    (@isbn, @title, @first, @last,
                     @genre, @pagecount, @price, @instock, 'n');";
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@isbn",      it.ISBN);
            cmd.Parameters.AddWithValue("@title",     it.Title);
            cmd.Parameters.AddWithValue("@first",     it.AuthorFirst);
            cmd.Parameters.AddWithValue("@last",      it.AuthorLast);
            cmd.Parameters.AddWithValue("@genre",     it.Genre);
            cmd.Parameters.AddWithValue("@pagecount", it.PageCount);
            cmd.Parameters.AddWithValue("@price", it.Price);
            cmd.Parameters.AddWithValue("@instock",   it.InStock);
            await cmd.ExecuteNonQueryAsync();
        }
// update/edit a book
        public async Task UpdateAsync(int id, InventoryItem u)
        {
            const string sql = @"
                UPDATE book
                   SET isbn         = @isbn,
                       title        = @title,
                       authorfirst  = @first,
                       authorlast   = @last,
                       genre        = @genre,
                       pagecount    = @pagecount,
                       price = @price,
                       instock      = @instock
                 WHERE bookid = @id;";
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@isbn",      u.ISBN);
            cmd.Parameters.AddWithValue("@title",     u.Title);
            cmd.Parameters.AddWithValue("@first",     u.AuthorFirst);
            cmd.Parameters.AddWithValue("@last",      u.AuthorLast);
            cmd.Parameters.AddWithValue("@genre",     u.Genre);
            cmd.Parameters.AddWithValue("@pagecount", u.PageCount);
            cmd.Parameters.AddWithValue("@price", u.Price);
            cmd.Parameters.AddWithValue("@instock",   u.InStock);
            cmd.Parameters.AddWithValue("@id",        id);
            await cmd.ExecuteNonQueryAsync();
        }
// delete book
        public async Task DeleteAsync(int id)
        {
            const string sql = @"
                UPDATE book
                   SET isdeleted = 'y'
                 WHERE bookid   = @id;";
            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@id", id);
            await cmd.ExecuteNonQueryAsync();
        }
    }
}