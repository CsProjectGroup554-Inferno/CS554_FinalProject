import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthorizeContext } from "../Authorization/Authorize";
import { auth } from "../Authorization/FirebaseConfig";

const Header = () => {
  const { user } = useContext(AuthorizeContext);
  return (
    <>
      <nav style={{ height: "70px" }} className="navbar navbar-expand navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NJ Rental
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarText">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <br />
              {!user ? (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>

                  <li>
                    <Link to="/" onClick={() => auth.signOut()}>
                      Logout
                    </Link>
                  </li>
                </>
              )}
              <br />

              {!user && (
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
