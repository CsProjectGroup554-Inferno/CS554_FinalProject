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
            <NavDropdown title="Menu" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/properties">Properties</Link>
              </NavDropdown.Item>

              {!user ? (
                <NavDropdown.Item>
                  <Link to="/login">Login</Link>
                </NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item>
                    <Link to="/profile">Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/chat">Message</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/" onClick={() => auth.signOut()}>
                      Logout
                    </Link>
                  </NavDropdown.Item>
                </>
              )}

              {!user && (
                <NavDropdown.Item>
                  <Link to="/signup">Sign up</Link>
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
