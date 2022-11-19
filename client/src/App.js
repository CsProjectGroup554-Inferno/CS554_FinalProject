import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthorizeProvider } from "./Authorization/Authorize";
import Header from "./components/Header";
import Login from "./Authorization/Login";
import SignUp from "./Authorization/SignUp";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./profile/Profile";
import ProtectedRoutes from "./Authorization/ProtectedRoutes";

function App() {
  return (
    <AuthorizeProvider>
      <Router>
        <Header />
        <div style={{ height: "70px" }}></div> {/*This is to push the content down so it doesn't overlap the header */}
        <Routes>
          {/* <Route path="/*" element={<Header />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthorizeProvider>
  );
}

export default App;
