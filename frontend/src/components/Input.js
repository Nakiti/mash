import { useState } from "react"
import "../styles/input.css"

const Input = (props) => {
  // const [temp, setTemp] = useState([...props.inputs])
  const [image, setImage] = useState("")

  const handleChange = (e) => {
    const temp = [...props.inputs]

    temp.map((item) => {
      if (item.id === props.selectedId) {
        item[e.target.name] = e.target.value
      }

      // console.log(item.id, props.id)
    })

    if (e.target.name == "image") {
      setImage(e.target.value)
    }

    // setTemp(temp)
    props.setInputs(temp)
  }

  
  return ( 
<div className="input-content relative p-4 bg-white rounded-md shadow-lg">
  <p className="input-number absolute top-0 left-0 m-2 text-sm font-bold">{props.number + 1}</p>
  {/* <button className="input-delete" onClick={() => props.handleDelete(props.id)}><i class="fa fa-trash"></i></button> */}
  <div className="input-inputs flex space-x-4">
    <input 
      type="text" 
      className="input-input input-name w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Enter Name" 
      name="name" 
      value={props.name} 
      onChange={handleChange}
    />
    <input 
      type="text" 
      className="input-input input-link w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Enter Image Link" 
      name="image" 
      value={props.image}
      onChange={handleChange}
    />
      {image && (
        <div className="image-preview">
          <img
            src={image}
            alt="Invalid Image"
            className="w-full h-12 w-12 object-contain rounded-md"
          />
        </div>
      )}
  </div>

</div>
  );
}
 
export default Input;