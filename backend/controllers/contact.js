import { db } from "../db.js";

export const postContact = (req, res) => {
  const query = "INSERT INTO contacts(`title`, `text`, `date`, `mashID`, `userID`) VALUES (?)"

  const values = [req.body.title, req.body.text, req.body.date, req.body.mashID, req.body.userID]

  db.query(query, [values], (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err)
    }
    return res.json(data)
  })
}