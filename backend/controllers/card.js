import { db } from "../db.js";

export const postCard = (req, res) => {
  const query = "INSERT INTO cards(`title`, `image`, `mashID`, `eloScore`) VALUES(?)"

  const values = [req.body.title, req.body.image, Number(req.body.mashID), Number(req.body.eloScore)]

  console.log(values)
  db.query(query, [values], (err, data) => {
    console.log("sdsfsdf")

    if (err) {
      console.log(err)
      return res.json(err)
    }
    return res.json(data)
  })
}

export const getCard = (req, res) => {
  const query = `SELECT * FROM cards WHERE mashID = ?`

  const value = req.params.id
  console.log(req.params.id)
  db.query(query, [value], (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err)
    }
    // console.log(res.json(data))
    return res.json(data)
  })

}

export const updateCard = (req, res) => {
  const query = `UPDATE cards SET eloScore = ? WHERE id = ?`

  console.log(req.body.eloScore)

  db.query(query, [req.body.eloScore, req.body.id], (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err)
    }
    return res.json(data)
  })
}