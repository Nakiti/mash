import { db } from "../db.js";

export const getMashes = (req, res) => {
  let query = "SELECT * FROM mashes WHERE userID = ?"
  const value = req.params.id

  console.log(value)

  db.query(query, [value], (err, data) => {
    if (err) return console.log(res.json(err))
    return console.log(res.json(data))
  })
}

export const getMashById = (req, res) => {
  let query = "SELECT * FROM mashes WHERE id = ?"
  const value = req.params.id

  db.query(query, [value], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
}

export const getMash = (req, res) => {
  let query = `SELECT * FROM mashes WHERE access = "public" AND category = ?`
  const value = req.params.id

  if (value == "all") {
    query = `SELECT * FROM mashes WHERE access = "public"`
  }
  
  db.query(query, [value], (err, data) => {
    if (err) console.log(err)
    return res.json(data)
  })
}

export const postMashes = (req, res) => {
  const query = "INSERT INTO mashes(`title`, `info`, `date`, `category`, `plays`, `access`, `userID`, `question`) VALUES (?)"
  const values = [req.body.title, req.body.info, req.body.timestamp, req.body.category, Number(req.body.plays), req.body.access, Number(req.body.userID), req.body.question]

  console.log(values)

  db.query(query, [values], (err, data) => {
    if (err) return console.log(err)
    return res.status(200).json(data)
  })
}

export const updateMashes = (req, res) => {
  const query = "UPDATE mashes SET plays = ? WHERE id = ?"
  const values = [req.body.plays, req.body.id]

  console.log(values)

  db.query(query, values, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
}

export const deleteMashes = (req, res) => {
  const query = "DELETE FROM mashes WHERE id = ?"
  const value = req.body.id

  db.query(query, [value], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
}