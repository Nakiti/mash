import express from "express"
import cors from "cors"
import authRoutes from "./routes/auths.js"
import cookieParser from "cookie-parser"
import mashRoutes from "./routes/mashes.js"
import cardRoutes from "./routes/cards.js"
import contactRoutes from "./routes/contacts.js"
import path from "path"
import http from "http"
// import { Server } from "socket.io"
const {Server} = require("socket.io")
import { handleUpdatePlays, handleUpdateScore } from "./sockets.js"

// dotenv.config({ path: '../.env'  })


const app = express()
const server = http.createServer(app)
export const io = new Server(server, {
   cors: {
     origin: "http://mash.herokuapp.com", // Your frontend origin
     methods: ["GET", "POST"],
     credentials: true
   }}
)


const corsOptions ={
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use("/auth", authRoutes)
app.use("/mashes", mashRoutes)
app.use("/cards", cardRoutes)
app.use("/contacts", contactRoutes)

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

const port = process.env.PORT || 4000

app.listen(port, (req, res) => {
  console.log("wooooooo")
  console.log(port)
})

server.listen(process.env.PORT, () => {
   console.log("server in da house")
})

io.on("connection", (socket) => {
   console.log('a user connected');
   socket.on("message", async(message) => {

      console.log(message)
      const data = JSON.parse(message);

      if (data.type === "UPDATE_SCORES") {
         await handleUpdateScore(socket, data.data);
      } else if (data.type == "UPDATE_PLAYS") {
         handleUpdatePlays(socket, data.data)
      } 
   })
})

