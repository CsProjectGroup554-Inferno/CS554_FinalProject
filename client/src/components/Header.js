import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthorizeContext } from "../Authorization/Authorize";
import { auth } from "../Authorization/FirebaseConfig";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const { user } = useContext(AuthorizeContext);
  return (
     
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">NJ Rental</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">            
          </Nav>
          <Nav>
          <NavDropdown title="Menu" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/properties">Properties</NavDropdown.Item>

              {!user ? (
              <NavDropdown.Item href="/login">
                Login
              </NavDropdown.Item>
              
              ) : (
                <>
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/" onClick={() => auth.signOut()}>Logout</NavDropdown.Item></>

              )}

              {!user && (
                <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    
  );
};

export default Header;
