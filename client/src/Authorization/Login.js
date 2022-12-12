import { useContext } from "react";
import { auth, googleProvider } from "./FirebaseConfig";
import { AuthorizeContext } from "./Authorize";
import validate from "../validation/index";
import { signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user } = useContext(AuthorizeContext);

  const handleLogIn = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = e.target.elements;
      await validate.email(email.value);
      await validate.password(password.value);
      await signInWithEmailAndPassword(auth, email.value, password.value);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleLogInWithGoogle = async () => {
    try {
      // close the popup window after login
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      alert(error.message);
    }
  };
  if (user) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <div className="loginContainer mt-5">
      <form onSubmit={handleLogIn}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" placeholder="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" placeholder="password" />
        </div>
        <button type="submit" className="btn btn-primary me-4">
          Log In
        </button>
        <button onClick={handleLogInWithGoogle} className="btn btn-primary">
          Log In with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
