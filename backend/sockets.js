import { db } from "./db.js"
import { getCardById, updateCardScores } from "./controllers/card.js"
import { io } from "./index.js"
import { getMashByIdLocal } from "./controllers/mash.js"

export const handleUpdateScore = async (socket, data) => {
   const { cardOne, cardTwo, scoreOne, scoreTwo, clicked } = data
   // const cardOne = getCardById(cardOneId)
   // const cardTwo = getCardById(cardTwoId)

   // if (!cardOne || !cardTwo) {
   //    socket.emit('updateResult', { success: false, error: 'Card not found' });
   //    return;
   // }

   const result = await updateCardScores(cardOne, cardTwo, scoreOne, scoreTwo, clicked, 0);

   if (result.success) {
      // console.log("successful")
      io.emit('updateCards', {type: "UPDATE_CARDS", cards: [result.cardOne, result.cardTwo]});
   } else {
      // console.log("unsuccessful")
      console.log(result.error)
      socket.emit('updateError', { success: false, error: result.error });
   }
}

export const handleUpdatePlays = async (socket, data, retryCount = 0) => {
   const { plays, id, version } = data;
   let maxRetries = 3

   console.log("stuff", plays, id, version)
 
   const query = `UPDATE mashes SET plays = ?, version = version + 1 WHERE id = ? AND version = ?`;
 
   db.query(query, [plays, id, version], (err, result) => {
      if (err) {
         console.error("Error updating mash plays:", err);
         const mash = getMashByIdLocal(id)

         // console.log(mash)

         if (retryCount < maxRetries) {
            return updateCardScores(socket, {...data, plays: mash.plays + 1}, retryCount + 1);
         } else {
            return { success: false, error: 'Maximum retry attempts reached' };
         }
      } else {
         // Fetch the updated mash data to send to clients
         // console.log(id)
         db.query(`SELECT * FROM mashes WHERE id = ?`, [id], (err, updatedResult) => {
            if (err) {
               console.error("Error fetching updated mash data:", err);
               socket.emit('updateError', { error: "Failed to fetch updated mash data" });
            } else {
               // console.log("updaedresult", updatedResult)
               io.emit('updatePlays', JSON.stringify({ type: 'MASH_DATA', mash: updatedResult[0] }));
            }
         });
      }
   });
}

export const handleGetMashById = (socket, data) => {
   const { id } = data;

   const query = `SELECT * FROM mashes WHERE id = ?`;

   db.query(query, [id], (err, result) => {
      if (err) {
         console.error("Error fetching mash data:", err);
         socket.emit('fetchError', { error: "Failed to fetch mash data" });
      } else {
         console.log("data sent")
         socket.emit('message', { type: 'MASH_DATA', mash: result[0] });
      }
   });
}