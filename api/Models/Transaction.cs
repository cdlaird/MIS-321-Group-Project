using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.models
{
    public class Transaction
    {
        //transaction class objects

        public required int transactionID  {get; set;}
        public int custid {get; set;}
        public int bookid  {get; set;}
        public DateTime datetime {get; set;}

        //methods for transactions Create, Read Update, Delete (CRUD)
        //methods are called by controller. These methods connect to database using connection
        //string and sql commands to complete CRUD operations

        //select 
        private async Task<List<Transaction>> SelectTransactions(string sql, List<MySqlParameter> Parms){ //called by controller
            List<Transaction> myTransactions = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql,connection);
            (Parms != null){
                command.Parameters.Addrange(Parms.ToArray());
            }
            using var reader = await command.ExecuteReaderAsync();
            while(await reader.ReadAsync()){
                myTransactions.Add(new Transaction(){
                    transactionID = reader.GetInt32(0),
                    custid = reader.GetInt32(1),
                    bookid = reader.GetInt32(2),
                    datetime = reader.GetDateTime(3)
                });
            }
        }
        private async Task TransactionsNoReturnSql(string sql, List<MySqlParameter> Parms){
            List<Transactions> myTransactions = new();
            using var connection = new MySqlConnection(cs);

            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if(Parms != null){
                command.Parameters.AddRange(Parms.ToArray());
            }
            await command.ExecuteNonQueryAsync();
        }
        public async Task<List<Transaction>> GetAllTransactionsAsync(){
            string sql ="";
            List<MySqlParameter> parms = new();
            return await SelectTransactions(sql,parms);
        }

        //finds a transaction for use in editing/deleting/searching
        public async Task<Transaction> GetATransactionAsync(string id){
            string sql ="";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@transactionID", MySqlDbType.Int32){Value = id});
            List<Transaction> myTransactions = await SelectTransactions(sql, parms);
            return myTransactions.Find(x => x.transactionID ==id);
        }

        //add in a transaction
        public async Task insertTransactionAsync(Transaction myTransaction){
            string sql ="";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@transactionID", MySqlDbType.Int32) {Value = myTransaction.transactionID});
            parms.Add(new MySqlParameter("@custid",MySqlDbType.Int32){Value = myTransaction.custid});
            parms.Add(new MySqlParameter("@bookid",MySqlDbType.Int32){Value = myTransaction.bookid});
            parms.Add(new MySqlParameter("@datetime",MySqlDbType.DateTime){Value = myTransaction.DateTime});
            await TransactionsNoReturnSql(sql, parms);
        }

        //delete a transaction
        public async Task deleteTransactionAsync(string id){
            try{
                using var connnection = new MySqlConnection(cs);
                await connection.OpenAsync();
                string sql = $"";
                var command = new MySqlCommand(sql, connection);
                command.Parameters.AddWithValue($"{id}",id);
                command.Prepare();
                await command.ExecuteNonQueryAsync();
                connection.Close();
                System.Console.WriteLine("Made it to delete transaction Async");
            }
            catch (Exception e){
                System.Console.WriteLine(e.Message);
            }
        }
    }  
}