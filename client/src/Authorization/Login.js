import { useContext } from "react";
import { auth, googleProvider } from "./FirebaseConfig";
import { AuthorizeContext } from "./Authorize";
import validate from "../validation/index";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const { user } = useContext(AuthorizeContext);

  const handleLogIn = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = e.target.elements;
      await validate.email(email.value);
      await validate.password(password.value);
      await signInWithEmailAndPassword(auth, email.value, password.value);
      document.getElementById("HomeBtn").click();
    } catch (error) {
      alert(error.message);
    }
  };
  const handleLogInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      document.getElementById("HomeBtn").click();
    } catch (error) {
      alert(error.message);
    }
  };
  if (user) {
    console.log(user);
  }

  return (
    <div className="loginContainer">
      <form onSubmit={handleLogIn}>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary me-4">
          Log In
        </button>
        <button onClick={handleLogInWithGoogle} className="btn btn-primary">
          Log In with Google
        </button>
      </form>
      <Link to="/" id="HomeBtn" visibility="hidden"></Link>
    </div>
  );
};

export default Login;
