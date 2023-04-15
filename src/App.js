import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import {
  addItemToList,
  clearItemList,
  removeItem,
  editListItem,
  searchItemInList,
  sortListToggle
} from "./actions/actionCreater";

import { useSelector, useDispatch } from "react-redux";
import { BsArrowDownUp } from "react-icons/bs";

function App() {
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [toggle,setToggle] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  let masterList = JSON.parse(localStorage.getItem("masterList"));

  //intializing state and dispatch
  const list = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  //add and edit functionality
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || name.trim() === "") {
      showAlert(true, "please enter value", "danger");
    } else if (name && isEditing) {
      if (!checkItemInList(name)) {
        dispatch(editListItem(list, editId, name));

        setName("");
        setEditId(null);
        setIsEditing(false);
        showAlert(true, `item changed`, "success");
      }
    } else {
      if (!checkItemInList(name)) {
        showAlert(true, `${name.trim()} added to the list`, "success");
        dispatch(addItemToList(name, list));
        setName("");
      }
    }
    setSearch('');
  };

  const checkItemInList = (name) => {
    let isItemInList = false;
    for (let i = 0; i < list.length; i++) {
      if (list[i].title === name.trim().toLowerCase()) {
        isItemInList = true;
        break;
      }
    }
    showAlert(true, `${name.trim()} is already in bucket`, "danger");
    setName("");
    return isItemInList;
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "grocery list cleared", "danger");
    dispatch(clearItemList());
  };

  const remove = (id, name) => {
    showAlert(true, `${name} removed`, "danger");
    let listAfterRemovalofItem = list.filter((item) => item.id !== id);
    dispatch(removeItem(listAfterRemovalofItem));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  const sortToggle = () => {
    setToggle(!toggle)
    dispatch(sortListToggle(list,toggle));
  };
  const searchGrocery = (item) => {
    dispatch(searchItemInList(item, list));
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery buddy</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. Eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {masterList.length > 0 && (
        <div className="search-box-container">
          <form className="grocery-form">
            <div className="form-control">
              <input
                type="text"
                className="grocery"
                placeholder="search grocery"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  searchGrocery(e.target.value);
                }}
              />
            </div>
          </form>
          <div className="toggle-btn" onClick={sortToggle}>
            <BsArrowDownUp/>
          </div>
        </div>
      )}
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={remove} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;