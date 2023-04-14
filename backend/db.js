import mysql from "mysql"
import fs from "fs"
import path from "path"

let config = {
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'bcc2a5413dcff9',
  password: '005118ee',
  db: 'heroku_b365f94355ac3f8',
  port: 3306,
  // ssl: {ca: fs.readFileSync(path.resolve("../DigiCertGlobalRootCA.crt.pem"))}
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









