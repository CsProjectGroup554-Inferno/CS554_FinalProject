import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthorizeProvider } from "./Authorization/Authorize";
import Header from "./components/Header";
import Chat from "./pages/Chat";
import Login from "./Authorization/Login";
import SignUp from "./Authorization/SignUp";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./coustom.css";
import Profile from "./profile/Profile";
import ProtectedRoutes from "./Authorization/ProtectedRoutes";
import Home from "./components/Home";
import Properties from "./components/Properties";
import PropertiesDetail from "./components/PropertiesDetail";
import AddProperty from "./profile/AddProperty";
import Favorites from "./profile/Favorites";
import MyProperty from "./profile/MyProperty";
// import EditProperty from "./profile/EditProperty";

function App() {

  return (
  
    <AuthorizeProvider>
      <Router>
        <Header />
        {/* <Csocket/> */}
        <div style={{ height: "0px" }}></div> {/*This is to push the content down so it doesn't overlap the header */}
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
            {/* <Route path="/profile/properties/edit" element={<EditProperty />} /> */}
            <Route path="/profile/favorites" element={<Favorites />} />
            <Route path="/profile/myProperties" element={<MyProperty />} />
          </Route>
        </Routes>
      </Router>
    </AuthorizeProvider>
  );
}

export default App;
