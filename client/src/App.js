import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthorizeProvider } from "./Authorization/Authorize";
import Header from "./components/Header";
import Login from "./Authorization/Login";
import SignUp from "./Authorization/SignUp";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthorizeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthorizeProvider>
  );
}

export default App;
