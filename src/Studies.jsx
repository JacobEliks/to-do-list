import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Studies() {
  const [studyItems, setStudyItems] = useState(()=>JSON.parse(localStorage.getItem("studyItems") ?? "[]"));
  const [idCounter2, setIdCounter2] = useState(()=>JSON.parse(localStorage.getItem("idCounter2") ?? 1))

  useEffect(() => {
    localStorage.setItem("studyItems", JSON.stringify(studyItems));
    localStorage.setItem("idCounter2", JSON.stringify(idCounter2));
}, [studyItems]);

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.backgroundColor = "#E3F2C1";
    return () => {
    body.style.backgroundColor = ''; // Reset to default background color if needed
    };
  }, []);

function addItem(inputText) {
  setStudyItems(prevItems => {
    return [...prevItems, {id: idCounter2, text: inputText, checked: false, isEditing: false}];
  });
  setIdCounter2(idCounter2+1);
}

const handleDeleteCkick = (id) => {
  setStudyItems((prevTodoList) => {
    const updatedTodoList = prevTodoList.filter((item) => item.id !== id);
    return updatedTodoList;
  });
};

function handleCheckClick(id) {
  const updatedItems = studyItems.map((item)=>{
    if (item.id===id) {
      return {
        ...item,
        checked: !item.checked
      };
    }
    return item;
  });
  setStudyItems(updatedItems)
}

  function handleEditClick (id, text, editing) {
    const updatedItems = studyItems.map((item)=>{
      if (item.id===id) {
        if(editing) {
          return {
            ...item,
            text: text,
            isEditing: !item.isEditing
          };
        }else{
          return {
            ...item,
            isEditing: !item.isEditing
          };
        }
      }
      return item
    });
    setStudyItems(updatedItems)
  }
  
  


  return (
    <div className="container">
      <div className="heading">
        <Link to={"/work"}><button className="nav-button work"><FontAwesomeIcon icon={faBriefcase} /></button></Link>
        <h1 className="studies-color">Study To-Do List</h1>
        <Link to={"/"}><button className="nav-button home-right"><FontAwesomeIcon icon={faHouse} /></button></Link>
      </div>
      <InputArea onAdd={addItem} inputColor={"studies-input"}/>
      <div>
        <ul className="checkbox-list">
          {studyItems.map((todoItem, index) => (
            <ToDoItem
              editing={todoItem.isEditing}
              checked={todoItem.checked}
              key={todoItem.id}
              id={todoItem.id}
              text={todoItem.text}
              onDelete={handleDeleteCkick}
              onChecked={handleCheckClick}
              onEditClick={handleEditClick}
              buttonColor={"studies-color"}
              inputColor={"studies-input"}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Studies;
