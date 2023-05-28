import React, { useState } from "react";

function InputArea(props) {
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  return (
    <div className="form">
      <input className={props.inputColor} onKeyDown={(event)=> {
        if (event.key==="Enter" && inputText!=="") 
          {props.onAdd(inputText);
          setInputText("");
          }}}  placeholder="My To-Do..." onChange={handleChange} type="text" value={inputText} />
      <button disabled={inputText===""} className="add"
        onClick={() => {
          props.onAdd(inputText);
          setInputText("");
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
