import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Work() {
  const [workItems, setWorkItems] = useState(()=>JSON.parse(localStorage.getItem("workItems") ?? "[]"));
  const [idCounter3, setIdCounter3] = useState(()=>JSON.parse(localStorage.getItem("idCounter3") ?? 1))

  useEffect(() => {
    localStorage.setItem("workItems", JSON.stringify(workItems));
    localStorage.setItem("idCounter3", JSON.stringify(idCounter3));
}, [workItems]);

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.backgroundColor = "#C9EEFF";
    return () => {
    body.style.backgroundColor = ''; // Reset to default background color if needed
    };
  }, []);

function addItem(inputText) {
  setWorkItems(prevItems => {
    return [...prevItems, {id: idCounter3, text: inputText, checked: false, isEditing: false}];
  });
  setIdCounter3(idCounter3+1);
}

const handleDeleteCkick = (id) => {
  setWorkItems((prevTodoList) => {
    const updatedTodoList = prevTodoList.filter((item) => item.id !== id);
    return updatedTodoList;
  });
};

function handleCheckClick(id) {
  const updatedItems = workItems.map((item)=>{
    if (item.id===id) {
      return {
        ...item,
        checked: !item.checked
      };
    }
    return item;
  });
  setWorkItems(updatedItems)
}

  function handleEditClick (id, text, editing) {
    const updatedItems = workItems.map((item)=>{
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
    setWorkItems(updatedItems)
  }
  
  


  return (
    <div className="container">
      <div className="heading">
        <Link to={"/"}><button className="nav-button home-left"><FontAwesomeIcon icon={faHouse} /></button></Link>
        <h1 className="work-color">Work To-Do List</h1>
        <Link to={"/studies"}><button className="nav-button study"><FontAwesomeIcon icon={faBook} /></button></Link>
      </div>
      <InputArea onAdd={addItem} inputColor={"work-input"}/>
      <div>
        <ul className="checkbox-list">
          {workItems.map((todoItem, index) => (
            <ToDoItem
              editing={todoItem.isEditing}
              checked={todoItem.checked}
              key={todoItem.id}
              id={todoItem.id}
              text={todoItem.text}
              onDelete={handleDeleteCkick}
              onChecked={handleCheckClick}
              onEditClick={handleEditClick}
              buttonColor={"work-color"}
              inputColor={"work-input"}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Work;
