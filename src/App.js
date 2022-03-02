import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //check if value is empty, then display alert
      //display Alert
      showAlert(true, "please enter name of item", "danger");
    } else if (name && isEditing) {
      //deal with edit
    } else {
      //show alert
      showAlert(true, "item added to the list", "success");
      //Add item to list
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([newItem, ...list]);
      setName(""); //clear text field after adding to list
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "items cleared", "danger");
    setList([]); //empty list
  };

  const removeItem = (id) => {
    showAlert(true, "item removed", "danger");
    const newList = list.filter((item) => {
      return item.id !== id;
    });
    setList(newList);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onClick={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery app</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="eg. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {/* Only display list form when list is not empty*/}
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
