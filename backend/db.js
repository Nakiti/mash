import mysql from "mysql"
import fs from "fs"
import path from "path"

let config = {
  host: 'nra-mysql.mysql.database.azure.com',
  user: 'mash',
  password: '99Bottles$',
  database: 'mash',
  port: 3306,
  ssl: {ca: fs.readFileSync(path.resolve("../DigiCertGlobalRootCA.crt.pem"))}
}
export const db = new mysql.createConnection(config)

db.connect(
  function (err) { 
  if (err) { 
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  }
  else
  {
    console.log("Connection established.");
  }
});









