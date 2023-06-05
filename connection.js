const mysql=require('mysql')
require('dotenv').config();

const connection=mysql.createConnection({
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})
connection.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('connected')
    }
})
module.exports=connection;