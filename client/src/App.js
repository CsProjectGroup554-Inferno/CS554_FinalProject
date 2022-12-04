import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthorizeProvider } from "./Authorization/Authorize";
import Header from "./components/Header";
import Login from "./Authorization/Login";
import SignUp from "./Authorization/SignUp";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./profile/Profile";
import ProtectedRoutes from "./Authorization/ProtectedRoutes";
import Home from "./components/Home";
import Property from "./components/Property";
import AddProperty from "./profile/AddProperty";

function App() {
  return (
    <AuthorizeProvider>
      <Router>
        <Header />
        <div style={{ height: "70px" }}></div> {/*This is to push the content down so it doesn't overlap the header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<Property />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/property/add" element={<AddProperty />} />
          </Route>
        </Routes>
      </Router>
    </AuthorizeProvider>
  );
}

export default App;
