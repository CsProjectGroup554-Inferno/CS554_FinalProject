// 
import React, { useState } from "react";
import Chatwindow from "./Chatwindow";
import Sidebar from "./Sidebar";
const Chat = (props) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [userSelected, setUserSelected] = useState(false); //So that any chat window is not rendered when app is loaded

  console.log("in home", props.connectedUsers);


  const getSelectedUser = (user) => {
    setSelectedUser(user);
    setUserSelected(true);
    console.log("In home, selected user:", user);
  };

  return (
    <div className="chat-container">
      <div>
        <div className="user-card">{props.user}</div>
        <div className="user-list"></div>
        <Sidebar
          connectedUsers={props.connectedUsers}
          selectUser={getSelectedUser}
        />
      </div>
      {userSelected ? (
        <div>
          <Chatwindow
            selectedUser={selectedUser}
            connectedUsers={props.connectedUsers}
          />
        </div>
      ) : (
        <div className="no-render-message">Click chat to start messaging</div>
      )}
    </div>
  );
};

export default Chat;