import { db } from "../db.js";

export const postContact = (req, res) => {
  const query = "INSERT INTO contacts(`subject`, `text`, `date`) VALUES (?)"

  const values = [req.body.subject, req.body.text, req.body.date]

  db.query(query, [values], (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err)
    }
    return res.json(data)
  })
}