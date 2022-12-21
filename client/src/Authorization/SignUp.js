import { auth } from "./FirebaseConfig";
import { AuthorizeContext } from "./Authorize";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import validate from "../validation/index";
import { Link } from "react-router-dom";

const Signup = () => {
  const { user } = useContext(AuthorizeContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password, confirmPassword } = e.target.elements;
      await validate.email(email.value);
      await validate.passwordsMatch(password.value, confirmPassword.value);
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      await auth.signOut();
      document.getElementById("HomeBtn").click();
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    console.log(user);
  }

  return (
    <>
      <div className="loginContainer mt-5">
        <div className=" visually-hidden">
          <Link id="HomeBtn" to="/login">
            Home
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="confirm password" />
          </div>
          <div className="loginButton">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <div className="loginButton">
            <Link to="/login" className=" btn btn-primary ms-3">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
