import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>

      <section className="home-section1">
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
      </section>

      <section className="home-section2">
        <div className="home-div">
          <h3 className="home-h3-1"> Major Cities</h3>
        </div>
        <div className="row">
          <div className="img-column">
            <Link to={"/properties?filter=Newark"}>
              <img className="circular--square" src="./img/6.jpg" alt="txt" />
              <h6 className="img-circlle-title">Newark</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?filter=Hoboken">
              <img className="circular--square" src="./img/7.jpg" alt="txt" />
              <h6 className="img-circlle-title">Hoboken</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?filter=Jersey City">
              <img className="circular--square" src="./img/8.jpg" alt="txt" />
              <h6 className="img-circlle-title">Jersey City</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?filter=Paterson">
              <img className="circular--square" src="./img/9.jpg" alt="txt" />
              <h6 className="img-circlle-title">Paterson</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?filter=Trenton">
              <img className="circular--square" src="./img/10.jpg" alt="txt" />
              <h6 className="img-circlle-title">Trenton</h6>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section3">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>About us</title>
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
          <link rel="icon" href="{% static 'PICO-LOGO-SHORT.png' %}" type="image/gif" />
        </head>

        <div className="company">
          <div className="img">
            <img src="./img/5.jpg" alt="" />
          </div>
          <div className="company-info">
            <span>NJRental - <span className="our">Rental made easy</span></span>
            <p>
              <b>NJ Rental</b> is one stop for all users to search for thier perfect home or post thier property available for rent. Chat with the owner get every little details checked off your check
              list for a perfect home. We make finding your perfect home in any city all across New Jersey easy.Our suite of online services enables clients to analyze, interpret and gain unmatched
              insight on commercial property values, market conditions and current availabilities.Search thousands of up-to-date property listings on our easy-to-use website. Narrow down your options
              by choosing what's most important to you, such as number of bedrooms and bathrooms, price range, location, pet policy and more. Chat with other users to get an insight to their experience
              and ideas for finding the perfect place.
            </p>
          </div>
        </div>
      </section>

    </>



  );
};

export default Home;
