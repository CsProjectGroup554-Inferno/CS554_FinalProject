import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>

      <section className="home-section1 slider-sec">
        <Carousel autoPlay>
          <div class="slider-data">
            <div class="slider-caption">
              <h1>Renting Made Simple</h1>
              <p>Browse the highest quality listings, apply online, sign your lease, and even pay your rent from any device.</p>
            </div>
            <img className="home-carousel-img" src="./img/hh11.jpg" alt="txt" />
          </div>
          <div class="slider-data">
            <div class="slider-caption">
              <h1>Lease 100% Online</h1>
              <p>Accept applications, process rent payments online, and sign digital leases all powered on a single platform.</p>
            </div>
            <img className="home-carousel-img" src="./img/hh22.jpg" alt="txt" />
          </div>
          <div class="slider-data">
            <div class="slider-caption">
              <h1>NJRental is built for living</h1>
              <p>Please choose a location you’re interested in and provide us with your contact information so we can set up a tour.</p>
            </div>
            <img className="home-carousel-img" src="./img/hh33.jpg" alt="txt" />
          </div>
        </Carousel>
      </section>

      <section className="home-section2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="home-div">
                <h2 className="home-h3-1 mt-0"> Major Cities</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="img-column">
                <Link to={"/properties?filter=Newark"}>
                  <img className="circular--square" src="./img/6.jpg" alt="txt" />
                  <h3 className="img-circlle-title">Newark</h3>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="img-column">
                <Link to="/properties?filter=Hoboken">
                  <img className="circular--square" src="./img/7.jpg" alt="txt" />
                  <h3 className="img-circlle-title">Hoboken</h3>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="img-column">
                <Link to="/properties?filter=Jersey City">
                  <img className="circular--square" src="./img/8.jpg" alt="txt" />
                  <h3 className="img-circlle-title">Jersey City</h3>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="img-column">
                <Link to="/properties?filter=Paterson">
                  <img className="circular--square" src="./img/9.jpg" alt="txt" />
                  <h3 className="img-circlle-title">Paterson</h3>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </section>

      <section className="section about bg" id="about">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">

              <img src="./img/5.jpg" alt="imgprop" className="img-fluid" />

            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="about-box ab-padding">
                <div className="about-title">
                  <h2>About <span class="common-color">Us</span></h2>
                </div>
                <p className="home-text"><b>NJ Rental</b> is one stop for all users to search for thier perfect home or post thier property available for rent. Chat with the owner get every little details checked off your check
                  list for a perfect home. We make finding your perfect home in any city all across New Jersey easy.Our suite of online services enables clients to analyze, interpret and gain unmatched
                  insight on commercial property values, market conditions and current availabilities.Search thousands of up-to-date property listings on our easy-to-use website. Narrow down your options
                  by choosing what's most important to you, such as number of bedrooms and bathrooms, price range, location, pet policy and more. Chat with other users to get an insight to their experience
                  and ideas for finding the perfect place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="home-section3">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>About us</title>
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
          <link rel="icon" href="{% static 'PICO-LOGO-SHORT.png' %}" type="image/gif" />
        </head>
      </section> */}

    </>



  );
};

export default Home;
