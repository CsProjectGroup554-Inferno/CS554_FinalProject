// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthorizeContext } from "../Authorization/Authorize";
// import { auth } from "../Authorization/FirebaseConfig";
// import { Helmet } from 'react-helmet-async';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Home = () => {
  // const { user } = useContext(AuthorizeContext);
  return (
    <>
      <section className="home-section1">
        <div className="row">
          <div className="column">
            <h1 className="home-h1">NJ Rental</h1>
            <p className="home-p-1">
              <b>NJ Rental</b> is one stop for all users to search for thier perfect home or post thier property available for rent. Chat with the owner get every little details checked off your check
              list for a perfect home. We make finding your perfect home in any city all across New Jersey easy.Our suite of online services enables clients to analyze, interpret and gain unmatched
              insight on commercial property values, market conditions and current availabilities.
            </p>
            <img className="home-img" src="./img/5.jpg" alt="img5" />
          </div>
          <div className="column">
            <Carousel autoPlay>
              <div>
                <img className="home-carousel-img" src="./img/1.jpg" alt="txt" />
              </div>
              <div>
                <img className="home-carousel-img" src="./img/2.jpg" alt="txt" />
              </div>
              <div>
                <img className="home-carousel-img" src="./img/3.jpg" alt="txt" />
              </div>
            </Carousel>
          </div>
        </div>

        <div className="home-div">
          <h3 className="home-h3-1"> Major Cities</h3>
        </div>
        <div className="row">
          <div className="img-column">
            <Link to="/properties?city=Newark">
              <img className="circular--square" src="./img/6.jpg" alt="txt" />
              <h6 className="img-circlle-title">Newark</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?city=Hoboken">
              <img className="circular--square" src="./img/7.jpg" alt="txt" />
              <h6 className="img-circlle-title">Hoboken</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?city=Jersey City">
              <img className="circular--square" src="./img/8.jpg" alt="txt" />
              <h6 className="img-circlle-title">Jersey City</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?city=Paterson">
              <img className="circular--square" src="./img/9.jpg" alt="txt" />
              <h6 className="img-circlle-title">Paterson</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?city=Trenton">
              <img className="circular--square" src="./img/10.jpg" alt="txt" />
              <h6 className="img-circlle-title">Trenton</h6>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section2">
        <div className="row">
          <div className="column-1">
            <h1 className="home-h1">Renting in New Jersey made easy</h1>
            <p className="home-p-1">
              Select from major cities accross New Jersey and find the perfect place to rent. Check out all the amemnnities in and arround the place that suits your idea of a perfect place. NJRental
              makes finding home easy with:{" "}
            </p>
            <ul className="home-list">
              <li>
                <h3 className="home-h3-2">Filtering properties</h3>
              </li>
              <li>
                <h3 className="home-h3-2">Contact owners directly</h3>
              </li>
              <li>
                <h3 className="home-h3-2">Save your favorite property</h3>
              </li>
            </ul>
          </div>
          <div className="column-1">
            <img src="./img/11.jpg" className="img-fluid floating" alt="an apartment" />
          </div>
        </div>
      </section>

      <section className="home-section3">
        <div className="row">
          <div className="column-2">
            <div className="card bg-default shadow border-0">
              <img src="./img/12.jpg" className="card-img-top" alt="community" />
              <blockquote className="card-blockquote">
                <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="svg-bg">
                  <polygon points="0,52 583,95 0,95" className="fill-default" />
                  <polygon points="0,42 583,95 683,0 0,95" opacity=".2" className="fill-default" />
                </svg>
                <h1 className="display-3 font-weight-bold text-white">Lovely Community</h1>
              </blockquote>
            </div>
          </div>
          <div className="column-2">
            <div className="card bg-default shadow border-0">
              <img src="./img/13.jpg" className="card-img-top" alt="community" />
              <blockquote className="card-blockquote">
                <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="svg-bg">
                  <polygon points="0,52 583,95 0,95" className="fill-default" />
                  <polygon points="0,42 583,95 683,0 0,95" opacity=".2" className="fill-default" />
                </svg>
                <h1 className="display-3 font-weight-bold text-white">Ammenities you want</h1>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
