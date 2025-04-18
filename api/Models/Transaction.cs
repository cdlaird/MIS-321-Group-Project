using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySqlConnector;
using API.Database;

namespace API.models
{
    public class Transaction
    {
        public database DB;

        //transaction class objects
        
        public int transactionID  {get; set;}
        public int custid {get; set;}
        public int bookid  {get; set;}
        public DateTime datetime {get; set;}

        //methods for transactions Create, Read Update, Delete (CRUD)
        //methods are called by controller. These methods connect to database using connection
        //string and sql commands to complete CRUD operations

        //select 
        private async Task<List<Transaction>> SelectTransactions(string cs, string sql, List<MySqlParameter> Parms){ //called by controller
            List<Transaction> myTransactions = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql,connection);
            if(Parms != null){
                command.Parameters.AddRange(Parms.ToArray());
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
            return myTransactions;
        }
        private async Task TransactionsNoReturnSql(string cs, string sql, List<MySqlParameter> Parms){
            List<Transaction> myTransactions = new();
            using var connection = new MySqlConnection(cs);

            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if(Parms != null){
                command.Parameters.AddRange(Parms.ToArray());
            }
            await command.ExecuteNonQueryAsync();
        }
        public async Task<List<Transaction>> GetAllTransactionsAsync(){
            string sql ="SELECT * FROM mvjb2fks5fyrys10.transaction WHERE deleted = 'n';";
            List<MySqlParameter> parms = new();
            return await SelectTransactions(DB.cs, sql, parms);
            System.Console.WriteLine("Completed get all transactions");
        }

        //finds a transaction for use in editing/deleting/searching
        public async Task<Transaction> GetATransactionAsync(string id){
            string sql ="SELECT * FROM `mvjb2fks5fyrys10`.`transaction` WHERE `isdeleted` = 'n' AND `transactionid` = @transactionid;";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@transactionID", MySqlDbType.Int32){Value = id});
            List<Transaction> myTransactions = await SelectTransactions(DB.cs, sql, parms);
            return myTransactions.Find(x => x.transactionID == int.Parse(id));
            System.Console.WriteLine("Completed get a transaction");
        }

        //add in a transaction
        public async Task insertTransactionAsync(Transaction myTransaction){
            string sql ="INSERT INTO `mvjb2fks5fyrys10`.`transaction` (`datetime`, `custid`) VALUES (@datetime, @custid);";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@transactionID", MySqlDbType.Int32) {Value = myTransaction.transactionID});
            parms.Add(new MySqlParameter("@custid",MySqlDbType.Int32){Value = myTransaction.custid});
            parms.Add(new MySqlParameter("@bookid",MySqlDbType.Int32){Value = myTransaction.bookid});
            parms.Add(new MySqlParameter("@datetime",MySqlDbType.DateTime){Value = myTransaction.datetime});
            await TransactionsNoReturnSql(DB.cs, sql, parms);
            System.Console.WriteLine("Completed insert transaction async");
        }

        //delete a transaction
        public async Task deleteTransactionAsync(string id){
            try{
                using var connection = new MySqlConnection(DB.cs);
                await connection.OpenAsync();
                string sql = $"UPDATE `mvjb2fks5fyrys10`.`transaction` SET `isdeleted` = 'y' WHERE (`transactionid` = @transactionid);";
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
