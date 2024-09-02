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

export const postCardBatch = (req, res) => {
   const query = "INSERT INTO cards(`title`, `image`, `mashID`, `eloScore`) VALUES ?";

   console.log(req.body)

   const values = req.body.map(card => [
      card.title,
      card.image,
      Number(card.mashID),
      Number(card.eloScore),
   ]);

   db.query(query, [values], (err, data) => {
      if (err) return res.json(err)
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

export const updateCardScores = async (cardOne, cardTwo, scoreOne, scoreTwo, clicked, retryCount = 0) => {
   const query = `UPDATE cards SET eloScore = ?, version = version + 1 WHERE id = ? AND version = ?`;
   const maxRetries = 3; 

   try {
      const resultOne = await new Promise((resolve, reject) => {
         db.query(query, [scoreOne, cardOne.id, cardOne.version], (err, data) => {
            if (err) return console.log("card1", err);
            resolve(data);
         });
      });

      const resultTwo = await new Promise((resolve, reject) => {
         db.query(query, [scoreTwo, cardTwo.id, cardTwo.version], (err, data) => {
            if (err) return console.log("card2", err);
            resolve(data);
         });
      });

      // console.log(resultOne.affectedRows, resultTwo.affectedRows)

      if (resultOne.affectedRows === 1 && resultTwo.affectedRows === 1) {
         const cardOneTemp = {...cardOne, eloScore: scoreOne, version: cardOne.version + 1}
         const cardTwoTemp = {...cardTwo, eloScore: scoreTwo, version: cardTwo.version + 1}
         //console.log("updated cards\n", cardOneTemp, cardTwoTemp)
         //console.log("attempts", retryCount)
         return { success: true, cardOne: cardOneTemp, cardTwo: cardTwoTemp };
      } else {
         const getCard = (id) => new Promise((resolve, reject) => {
            db.query("SELECT * FROM cards WHERE id = ?", [id], (err, data) => {
               if (err) return reject(err);
               resolve(data[0]);
            });
         });

         const one = await getCard(cardOne.id);
         const two = await getCard(cardTwo.id);

         // console.log("retry", one, two)

         if (!one || !two) {
            return { success: false, error: 'Card not found' };
         }

         let newScoreOne = one.eloScore;
         let newScoreTwo = two.eloScore;

         let expectedOne = 1 / (1 + 10**((newScoreTwo - newScoreOne) / 400)); // Calculate expected score
         let expectedTwo = 1 / (1 + 10**((newScoreOne - newScoreTwo) / 400));

         if (clicked == cardOne.id) {
            newScoreOne = one.eloScore + 16 * (1 - expectedOne)
            newScoreTwo = two.eloScore + 16 * (0 - expectedTwo)
         } else {
            newScoreOne = one.eloScore + 16 * (0 - expectedOne)
            newScoreTwo = two.eloScore + 16 * (1 - expectedTwo)
         }

         if (retryCount < maxRetries) {
            return updateCardScores(one, two, newScoreOne, newScoreTwo, clicked, retryCount + 1);
         } else {
            return { success: false, error: 'Maximum retry attempts reached' };
         }
      }
   } catch (err) {
      console.log(err);
      return { success: false, error: err.message };
   }
};


export const getCardById = async (id) => {
   const query = "SELECT * FROM cards WHERE id = ?"

   try {
      const [rows] = await new Promise((resolve, reject) => {
          db.query(query, [id], (err, data) => {
              if (err) return reject(err);
              resolve(data);
          });
      });

      return rows[0]; // Return the card data
  } catch (err) {
      console.log(err);
      throw err;
  }
}