import express from "express"
import { getMashes, postMashes, deleteMashes, getMash, updateMashes, getMashById, searchMash } from "../controllers/mash.js"

const router = express.Router()

router.get("/get/:id", getMashes)
router.post("/post", postMashes)
router.delete("/delete", deleteMashes)
router.get("/getmashbycat/:id", getMash)
router.put("/update", updateMashes)
router.get("/getmashbyid/:id", getMashById)
router.get("/search", searchMash)

export default router
