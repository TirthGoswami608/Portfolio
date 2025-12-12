const mysql =require("mysql2");// this loads the My sql library 
const pool= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"portfolio_db",
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});
module.exports=pool;
