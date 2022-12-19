import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthorizeContext } from "../Authorization/Authorize";
import { auth } from "../Authorization/FirebaseConfig";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const { user } = useContext(AuthorizeContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>NJ Rental</Navbar.Brand>
        </Link>
        {/* <Link to="/properties" className="mx-auto propertyHead">
          <Navbar.Text>Properties</Navbar.Text>
        </Link> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {!user ? (
              <Link to="/login" className="nav-link">Login</Link>
            ) : (
              <>
                <Link to="/properties" className="nav-link">Properties</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                <Link to="/chat" className="nav-link">Message</Link>

                <Link to="/" onClick={() => auth.signOut()} className="nav-link">
                  Logout
                </Link>
              </>
            )}

            {!user && (
              <Link to="/signup" className="nav-link">Sign up</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};

export default Header;
