import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthorizeProvider } from "./Authorization/Authorize";
import { AuthorizeContext } from "./Authorization/Authorize";
import Header from "./components/Header";
import Chat from "./components/Chat";
import Login from "./Authorization/Login";
import SignUp from "./Authorization/SignUp";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./profile/Profile";
import ProtectedRoutes from "./Authorization/ProtectedRoutes";
import Home from "./components/Home";
import Properties from "./components/Properties";
import PropertiesDetail from "./components/PropertiesDetail";
import AddProperty from "./profile/AddProperty";
import Favorites from "./profile/Favorites";
import socket from "./socket";

function App() {
  const { user } = useState(AuthorizeContext);
  const [userName, setUserName] = useState("");
  const [usersList, addUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  

  const getUsername = (fetched_userName) => {
    setUserName(fetched_userName);

    socket.auth = { fetched_userName };
    socket.connect();
  };

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
  return (
    <AuthorizeProvider>
      <Router>
        <Header />
        <div style={{ height: "70px" }}></div> {/*This is to push the content down so it doesn't overlap the header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/properties/:id" element={<PropertiesDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/properties/add" element={<AddProperty />} />
            <Route path="/profile/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </Router>
    </AuthorizeProvider>
  );
}

export default App;
