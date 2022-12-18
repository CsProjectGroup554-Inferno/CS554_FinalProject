import React, { useState,useEffect } from "react";
import Chatwindow from "./Chatwindow";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { AuthorizeContext } from "../Authorization/Authorize";
import serverRequest from "../serverRequest";
import socket from "../socket";
 
import {
	makeStyles,
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardHeader,
} from '@material-ui/core';
import '../App.css';
const useStyles = makeStyles({
	card: {
		maxWidth: 300,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	titleHead: {
		borderBottom: '1px solid rgb(28, 1, 80)',
		fontWeight: 'bold',
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row',
	},
	media: {
		marginLeft: 'auto',
		marginRight: 'auto',
		height: 'auto',
		width: '50%',
	},
	button: {
		color: '#178577',
		fontWeight: 'bold',
		fontSize: 12,
	},
    showlink: {
        alignItems: 'center',
        backgroundColor: '#fee6e3',
        border: '2px solid #111',
        borderRadius: '8px',
        boxSizing: 'border-box',
        color: '#111',
        cursor: 'pointer',
        display: 'flex',
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        height: '48px',
        justifyContent: 'center',
        lineHeight: '24px',
        maxWidth: '25%',
        padding: '0 25px',
        position: 'right',
        textAlign: 'center',
        textDecoration: 'none',
        userSelect: 'none',
        touchAction: 'manipulation',
        float: 'left',
        width: '200px',
        marginLeft: '44%'
    }
});
const Chat = (props) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [userSelected, setUserSelected] = useState(false); //So that any chat window is not rendered when app is loaded

  console.log("in home", props.connectedUsers);
  // console.log("in home", props.connectedUsers);
  const { user } = useContext(AuthorizeContext);
  const [userData, setUserData] = useState(null);
  const [usersList, addUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const classes = useStyles();
  useEffect(() => {
      if (user) {
          let getData = async () => {
              let data = await serverRequest.getUserById(user.uid);
              setUserData(data);
              console.log(data);
              console.log("hhhhhh")
              const dd = data.email;
              setUserName(dd);
              socket.auth = { dd };
              socket.connect();
          };
          getData();
      }
  }, [user]);

  

  // const getUsername = (fetched_userName) => {
  //   setUserName(fetched_userName);

  //   socket.auth = { fetched_userName };
  //   socket.connect();
  // };

  socket.on("users", (users) => {
      users.forEach((user) => {
          user.self = user.userID === socket.id;
      });
      users = users.sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
      });
      addUsers(users);
  });
  socket.on("user connected", (user) => {
      addUsers([...usersList, user]);
  });

  const getSelectedUser = (user) => {
    setSelectedUser(user);
    setUserSelected(true);
    console.log("In home, selected user:", user);
  };

  return (
    
    <div className="chat-container">
     
      <div>
      {userData?.email ? (
       <div className="user-card">{userData.email}</div> 
      ): null}
        <div className="user-list"></div>
        {userData?.email ? (
        <Sidebar
          connectedUsers={usersList}
          username ={userData.email}
          selectUser={getSelectedUser}
        />
        ): null}
      </div>
      {userSelected ? (
        <div>
          <Chatwindow
            selectedUser={selectedUser}
            connectedUsers={usersList}
          />
        </div>
      ) : (
        <div className="no-render-message">Click chat to start messaging</div>
      )}
    </div>
  );
};

export default Chat;