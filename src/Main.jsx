import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";



function Main() {
  const [items, setItems] = useState(()=>JSON.parse(localStorage.getItem("items") ?? "[]"));
  const [idCounter, setIdCounter] = useState(()=>JSON.parse(localStorage.getItem("id") ?? 1))

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("id", JSON.stringify(idCounter));
}, [items]);


    useEffect(() => {
        const body = document.querySelector('body');
        body.style.backgroundColor = "#ffeaa7";
        return () => {
        body.style.backgroundColor = ''; // Reset to default background color if needed
        };
    }, []);


  function addItem(inputText) {
    setItems(prevItems => {
      return [...prevItems, {id: idCounter, text: inputText, checked: false, isEditing: false}];
    });
    setIdCounter(idCounter+1);
  }

  const handleDeleteCkick = (id) => {
    setItems((prevTodoList) => {
      const updatedTodoList = prevTodoList.filter((item) => item.id !== id);
      return updatedTodoList;
    });
  };
  

  function handleCheckClick(id) {
    const updatedItems = items.map((item)=>{
      if (item.id===id) {
        return {
          ...item,
          checked: !item.checked
        };
      }
      return item;
    });
    setItems(updatedItems)
  }

  
  function handleEditClick (id, text, editing) {
    const updatedItems = items.map((item)=>{
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
    setItems(updatedItems)
  }


  return (
    <div className="container">
      <div className="heading">
        <Link to={"/work"}><button className="nav-button work"><FontAwesomeIcon icon={faBriefcase} /></button></Link>
        <h1 className="general-color">General To-Do List</h1>
        <Link to={"/studies"}><button className="nav-button study"><FontAwesomeIcon icon={faBook} /></button></Link>
      </div>
      <InputArea onAdd={addItem} inputColor={"general-input"} />
      <div>
        <ul className="checkbox-list">
          {items.map((todoItem) => (
            <ToDoItem
              editing={todoItem.isEditing}
              checked={todoItem.checked}
              key={todoItem.id}
              id={todoItem.id}
              text={todoItem.text}
              onDelete={handleDeleteCkick}
              onChecked={handleCheckClick}
              onEditClick={handleEditClick}
              buttonColor={"general-color"}
              inputColor={"general-input"}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;
