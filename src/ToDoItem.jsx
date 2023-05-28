import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function ToDoItem(props) {
  const [editText, setEditText] = useState(props.text)

  function handleEdit(event) {
    const newValue = event.target.value;
    setEditText(newValue);
  }


  return (
    <div>
      <li>
        <input onChange={()=>props.onChecked(props.id)} checked={props.checked} type="checkbox" id={"item"+props.id}></input>
        {props.editing ? <input className={"edit-input "+props.inputColor} onKeyDown={(event)=>{
          if(event.key==="Enter"){
            props.onEditClick(props.id, editText, props.editing)
          }
        }} onChange={handleEdit} type="text" value={editText}></input> : <label htmlFor={"item"+props.id} className="checkbox">{editText}</label>}
        <button onClick={()=>props.onDelete(props.id)} className={"delete "+props.buttonColor}></button>
        <button onClick={()=>props.onEditClick(props.id, editText, props.editing)} className={"edit "+props.buttonColor}>{props.editing ? <FontAwesomeIcon icon={faFloppyDisk} />  : <FontAwesomeIcon icon={faPencil} />}</button>
      </li>
    </div>
  );
}

export default ToDoItem;
