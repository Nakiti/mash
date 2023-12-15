import { useState } from "react"
import "../styles/input.css"

const Input = (props) => {
  // const [temp, setTemp] = useState([...props.inputs])

  const handleChange = (e) => {
    const temp = [...props.inputs]

    temp.map((item) => {
      if (item.id === props.selectedId) {
        item[e.target.name] = e.target.value
      }

      // console.log(item.id, props.id)
    })

    // setTemp(temp)
    props.setInputs(temp)
  }

  const handleDelete = (id) => {
    const temp = [...props.inputs]
    console.log(id)

    const index = temp.findIndex(item => item.id == id)

    temp.splice(index, 1)
    console.log(temp)

    // temp.map(item => {
    //   if (item.id > id) {
    //     item.id -= 1
    //   }
    // })

    // const filtered = temp.filter(item => item.id !== id)

    // console.log(filtered)

    // // const updated = filtered.map(item => {
    // //   if (item.id > id) {
    // //     item.id -= 1
    // //   }
    // //   return item
    // // })

    props.setInputs(temp)
  }

  return ( 
    <div className="input-content">
      <p className="input-number">{props.number + 1}</p>
      {/* <button className="input-delete" onClick={() => props.handleDelete(props.id, props.number)}><i class="fa fa-trash"></i></button> */}
      <div className="input-inputs">
        <input type="text" className="input-input input-name" placeholder="Enter Name" name="name"  onChange={handleChange}/>
        <input type="text" className="input-input input-link" placeholder="Enter Image Link" name="image" onChange={handleChange}/>
      </div>
    </div>
  );
}
 
export default Input;