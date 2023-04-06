const {connection} = require("../config/configdb");
const mysql = require('mysql2')
const conn = mysql.createConnection(connection)
const exitsCif = async (cif) => {
   result = await conn.promise().query(`SELECT * FROM usuarios WHERE cif = ?`, [cif]);
   console.log(result[0])
   return result[0].length > 0;
}
module.exports = exitsCif;