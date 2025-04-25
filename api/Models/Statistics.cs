using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MySqlConnector;
using api.Database;

namespace api.Models
{
    public class Statistics
    {
        private readonly database _db = new();

        // Gets daily, weekly, or monthly total sales
        public async Task<decimal> GetSalesByRangeAsync(string range)
        {
            string sql = @"
                SELECT SUM(b.price) as total
                FROM transaction t
                JOIN book b ON t.bookid = b.bookid
                WHERE t.isdeleted = 'n' AND ";

            if (range == "daily")
                sql += "DATE(t.datetime) = CURDATE()";
            else if (range == "weekly")
                sql += "YEARWEEK(t.datetime, 1) = YEARWEEK(CURDATE(), 1)";
            else if (range == "monthly")
                sql += "MONTH(t.datetime) = MONTH(CURDATE()) AND YEAR(t.datetime) = YEAR(CURDATE())";

            await using var conn = new MySqlConnection(_db.cs);
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand(sql, conn);
            var result = await cmd.ExecuteScalarAsync();

            return result != DBNull.Value ? Convert.ToDecimal(result) : 0;
        }

        // Top 5 authors by number of books sold
       public async Task<List<object>> GetTopAuthorsAsync()
{
    string sql = @"
        SELECT CONCAT(b.authorfirst, ' ', b.authorlast) AS author, COUNT(*) AS booksSold
        FROM transaction t
        JOIN book b ON t.bookid = b.bookid
        WHERE t.isdeleted = 'n'
        GROUP BY author
        ORDER BY booksSold DESC
        LIMIT 5;";

    var list = new List<object>();
    await using var conn = new MySqlConnection(_db.cs);
    await conn.OpenAsync();
    await using var cmd = new MySqlCommand(sql, conn);
    await using var reader = await cmd.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        list.Add(new { author = reader.GetString(0), count = reader.GetInt32(1) });
    }

    return list;
}


        // Top 5 books by number of sales
       public async Task<List<object>> GetTopBooksAsync()
{
    string sql = @"
        SELECT b.title, COUNT(*) AS sales
        FROM transaction t
        JOIN book b ON t.bookid = b.bookid
        WHERE t.isdeleted = 'n'
        GROUP BY b.title
        ORDER BY sales DESC
        LIMIT 5;";

    var list = new List<object>();
    await using var conn = new MySqlConnection(_db.cs);
    await conn.OpenAsync();
    await using var cmd = new MySqlCommand(sql, conn);
    await using var reader = await cmd.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        list.Add(new { title = reader.GetString(0), count = reader.GetInt32(1) });
    }

    return list;
}

    }
}
