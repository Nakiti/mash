import { useState } from "react";
import Header from "../components/Header";
import "../styles/contact.css"
import axios from "axios";


const Contact = () => {
   const [subject, setSubject] = useState("")
   const [text, setText] = useState("")

   const handleClick = async () => {
      const timestamp = new Date()
      let date = `${timestamp.getMonth() + 1}/${timestamp.getDate()}/${timestamp.getFullYear()}`

      await axios.post("/contacts/post", {subject: subject, text: text, date: date})
   }

   return ( 
      <div className="contact-content">
         <Header />
         <div className="contact-body">
         <p className="contact-header">CONTACT</p>
         <input type="text" className="contact-input" maxLength={"100"} placeholder="Enter Subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
         <textarea name="" id="" cols="30" rows="10" maxLength={"500"} className="contact-text" placeholder="Enter Content" value={text} onChange={(e) => setText(e.target.value)}></textarea>
         <button className="contact-submit" onClick={handleClick}>Submit</button>
         </div>
      </div>
   );
}
 
export default Contact;