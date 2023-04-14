import express from "express"
import { postCard, getCard, updateCard } from "../controllers/card.js"

const router = express.Router()

router.post("/post", postCard)
router.get("/get/:id", getCard)
router.put("/update", updateCard)

export default router