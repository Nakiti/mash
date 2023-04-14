import express from "express"
import cors from "cors"
import authRoutes from "./routes/auths.js"
import cookieParser from "cookie-parser"
import mashRoutes from "./routes/mashes.js"
import cardRoutes from "./routes/cards.js"

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

app.listen(4000, (req, res) => {
  console.log("woooooo")
})