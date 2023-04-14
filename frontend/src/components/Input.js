import "../styles/input.css"

const Input = (props) => {

  const handleChange = (e) => {
    const temp = props.inputs

    temp.map((item) => {
      if (item.id === props.selectedId) {
        item[e.target.name] = e.target.value
      }

      // console.log(item.id, props.id)
    })

    props.setInputs(temp)
  }

  const handleDelete = (id) => {
    console.log("click")
    const filteredArray = props.inputs.filter(item => item.id !== id)


    filteredArray.map((item) => {
      if (item.id > id) {
        item.id = item.id - 1
      }
    })

    console.log(filteredArray)

    props.setInputs(filteredArray)
  }

  return ( 
    <div className="input-content">
      <p className="input-number">{props.id + 1}</p>
        <button className="input-delete" onClick={() => handleDelete(props.id)}><i class="fa fa-trash"></i></button>
        <div className="input-inputs">
          <input type="text" className="input-input input-name" placeholder="Enter Name" name="name" value={props.inputs.name} onChange={handleChange}/>
          <input type="text" className="input-input input-link" placeholder="Enter Image Link" name="image" value={props.inputs.image} onChange={handleChange}/>
        </div>
    </div>
  );
}
 
export default Input;