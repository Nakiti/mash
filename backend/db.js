import mysql from "mysql"
import fs from "fs"
import path from "path"

let config = {
  host: 'us-cdbr-iron-east-02.cleardb.net',
  user: 'bf3c363a31b9bb',
  password: '26a3a226',
  database: 'heroku_49c69f646e08770',
  // port: 3306,
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









