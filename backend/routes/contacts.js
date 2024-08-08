import express from "express"
import {postContact} from "../controllers/contact.js"

const router = express.Router()

router.post("/post", postContact)

export default router