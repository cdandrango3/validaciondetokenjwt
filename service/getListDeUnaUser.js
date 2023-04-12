const {connection} = require("../config/configdb");
const mysql = require('mysql2')
const conn = mysql.createConnection(connection)
async function getUserCreditor(phone) {
    try{
    const result = await conn.promise().query(`SELECT * FROM usuarios WHERE Phone = ?`, [phone]);
    return result[0][0];
    }catch(err){
        return "error"
    }
  }
async function getallListUserDeUna() {
    try{
    const result = await conn.promise().query(`SELECT DISTINCT Phone FROM usuarios`);
    console.log(result)
    return result[0];
    }catch(err){
        console.log(err.data)
    }
}
module.exports = {getUserCreditor,getallListUserDeUna};