import express from "express"
import cors from "cors"
import authRoutes from "./routes/auths.js"
import cookieParser from "cookie-parser"
import mashRoutes from "./routes/mashes.js"
import cardRoutes from "./routes/cards.js"
import contactRoutes from "./routes/contacts.js"
import path from "path"

const app = express()


const corsOptions ={
  origin: true,
  credentials: true
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use("/auth", authRoutes)
app.use("/mashes", mashRoutes)
app.use("/cards", cardRoutes)
app.use("/contact", contactRoutes)

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

const port = process.env.PORT || 4000

app.listen(port, (req, res) => {
  console.log("woooooo")
  console.log(port)
})

