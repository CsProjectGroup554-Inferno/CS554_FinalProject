import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthorizeContext } from "../Authorization/Authorize";
import { auth } from "../Authorization/FirebaseConfig";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import "../../public/css/styles.min.css"

const Header = () => {
    const { user } = useContext(AuthorizeContext);
    return (

        <>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p> Copyright by Harshil@2040</p>
                        </div>

                    </div>
                </div>
            </div>


        </>


    );
};

export default Header;
