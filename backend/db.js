import mysql from "mysql"


let config = {
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'bcc2a5413dcff9',
  password: '005118ee',
  database: 'heroku_b365f94355ac3f8',
  port: 3306,
  // ssl: {ca: fs.readFileSync(path.resolve("../DigiCertGlobalRootCA.crt.pem"))}
}
export const db = new mysql.createPool(config)

// db.connect(
//   function (err) { 
//   if (err) { 
//     console.log("!!! Cannot connect !!! Error:");
//     throw err;
//   }
//   else
//   {
//     console.log("Connection established.");
//   }
// });









