import React, { useEffect, useState, useRef, useContext } from "react";
import { AuthorizeContext } from "../Authorization/Authorize";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/chat/ChatContainer";
import Contacts from "../components/chat/Contacts";
import serverRequest from "../serverRequest";
import Welcome from "../components/chat/Welcome";


const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const { user } = useContext(AuthorizeContext);
  const [userData, setUserData] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {
    if (user) {
      let getData = async () => {
        let data = await serverRequest.getUserById(user.uid);

        setUserData(data);
        // console.log("x7"+JSON.stringify(data));
      };
      getData();
    }
  }, [user]);

  // useEffect(async () => {
  //   if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
  //     navigate("/login");
  //   } else {
  //     setCurrentUser(
  //       await JSON.parse(
  //         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //       )
  //     );
  //   }
  // });
  useEffect(() => {

    if (userData) {
      socket.current = io(host);
      socket.current.emit("add-user", userData._id);
    }
  }, [userData]);

  useEffect( () => {
    if (userData) {
      let getData = async () => {
      let data1 =  await serverRequest.getallUser(userData._id);
      console.log("data2" + data1)
      setContacts(data1);
      }
      getData();

    }
  }, [userData]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? ( 
           <Welcome /> 
           ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )} 
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;

