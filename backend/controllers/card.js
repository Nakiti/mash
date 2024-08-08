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

export const updateCard = async (req, res) => {
    const query = `UPDATE cards SET eloScore = ? WHERE id = ?`
  
    const scoreOne = req.body.eloScoreOne
    const scoreTwo = req.body.eloScoreTwo
    const idOne = req.body.idOne
    const idTwo = req.body.idTwo
  
    try {
      // Perform the first update
      await new Promise((resolve, reject) => {
        db.query(query, [scoreOne, idOne], (err, data) => {
          if (err) return reject(err);
          resolve(data);
        });
      });
  
      // Perform the second update
      const result = await new Promise((resolve, reject) => {
        db.query(query, [scoreTwo, idTwo], (err, data) => {
          if (err) return reject(err);
          resolve(data);
        });
      });
  
      // Send response after both updates
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }