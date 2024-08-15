import mysql from "mysql2"

let config = {
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB,
   port: process.env.DB_PORT,
  // ssl: {ca: fs.readFileSync(path.resolve("../DigiCertGlobalRootCA.crt.pem"))}
}

export const db = new mysql.createPool(config)

// const handleConnect = () => {
//   db.connect(
//     function (err) { 
//     if (err) { 
//       console.log("!!! Cannot connect !!! Error:");
//       throw err;
//     }
//     else
//     {
//       console.log("Connection established.");
//     }
//   });
// }

// handleConnect()

// db.on("error", (err) => {
//   console.log("db error", err)
//   if (err.code == "PROTOCOL_CONNECTION_LOST") {
//     handleConnect()
//   } else {
//     console.log("ALL GOOD MATE")
//   }
// })








