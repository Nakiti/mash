import { db } from "../db.js";

export const postContact = (req, res) => {
  const query = "INSERT INTO contacts(`text`, `date`, `userID`) VALUES (?)"

  const values = [req.body.text, req.body.date, req.body.userID]

  db.query(query, [values], (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err)
    }
    return res.json(data)
  })
}