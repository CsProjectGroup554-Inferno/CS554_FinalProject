import React, { useState, useEffect } from "react";
import serverRequest from "../serverRequest";
import { Link, useNavigate } from "react-router-dom";
import "react-image-lightbox/style.css";
import { Carousel } from "react-responsive-carousel";
import { BiBed, BiUserCircle } from "react-icons/bi";
import { GiBathtub } from "react-icons/gi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdLocationCity, MdMyLocation } from "react-icons/md";
import { useContext } from "react";
import { AuthorizeContext } from "../Authorization/Authorize";

const PropertiesDetail = (props) => {
  const { user } = useContext(AuthorizeContext);
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState([]);
  // const [ /*isWatchlist,*/ setIsWatchlist] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthorizeContext);
  // const alert = useRef(useAlert());
  var id = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const property = await serverRequest.getPropertyById(id);
        console.log(property);
        setPropertyData(property);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        // alert.current.error(e.message)
      }
    }
    fetchData();
  }, [props, id, user]);

  let addPropertyToFavorite = async () => {
    try {
      await serverRequest.addFavorite(propertyData._id);
      alert("Added to favorite");
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  let contactwithOwner = async () => {
    try {
      console.log("owner" + JSON.stringify(propertyData.owner._id));

      const id = propertyData.owner._id;
      let data1 = await serverRequest.getallUser(id);
      let data2 = await serverRequest.getUserById(id);
      // console.log("index" + JSON.stringify(data1))
      let indexx = data1.findIndex((x) => x._id === id);
      // console.log("index" + indexx);
      // console.log(data1);
      // console.log(data2)
      // setpropertyindex(indexx)

      // setContacts(data1);
      let oldData = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      let data3 = {
        index: indexx,
        propertyowner : data2,
        data: propertyData.owner
      };
      // console.log("ddd"+JSON.stringify(data3))
      // let oldData = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      console.log(JSON.stringify(oldData))
      // const previousPosts = oldData ? JSON.parse(oldData) : [];
      const updatedPosts = {...oldData, ...data3};
      // console.log("uuuu"+JSON.stringify(updatedPosts))
      localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(updatedPosts));
      navigate("/chat");
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  const div = (property) => {
    return property.images.map((item, index) => (
      <div key={index}>
        <img src={item} alt="txt" />
      </div>
    ));
  };

  const li = (property) => {
    let price, zipcode, address, city, bedrooms, bathrooms, owner;
    if (property.price) {
      price = (
        <>
          <BsCurrencyDollar />
          {property.price}
        </>
      );
    }
    if (property.address) {
      address = (
        <>
          <MdMyLocation />
          {property.address}
        </>
      );
    }
    if (property.city) {
      city = (
        <>
          <MdLocationCity />
          {property.city}
        </>
      );
    }
    if (property.zipcode) {
      zipcode = (
        <>
          <GoLocation />
          {property.zipcode}
        </>
      );
    }
    if (property.bedrooms) {
      bedrooms = (
        <>
          <BiBed />
          {property.bedrooms}
        </>
      );
    }
    if (property.bathrooms) {
      bathrooms = (
        <>
          <GiBathtub />
          {property.bathrooms}
        </>
      );
    }
    if (property.owner._id && property.owner.email) {
      owner = (
        <>
          <BiUserCircle />
          <Link to={"/user/" + property.owner._id}>{property.owner.email}</Link>
        </>
      );
    }

    return (
      <>
        {price || bedrooms || bathrooms ? (
          <div className="icon-group">
            <p>
              {price} &nbsp;&nbsp;{bedrooms}&nbsp;&nbsp; {bathrooms}
            </p>
          </div>
        ) : null}

        <div className="icon-group">
          <p>{address}</p>
        </div>
        <div className="icon-group">
          <p>{city}</p>
        </div>
        <div className="icon-group">
          <p>{zipcode}</p>
        </div>
        <div className="icon-group">
          <p>{owner}</p>
        </div>
      </>
    );
  };

  if (loading) {
    return (
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <main>
      <section className="property-detail-title">
        <div id="container">
          <div class="product-details">
            <h1>{propertyData.title}</h1>

            <p class="information">{propertyData.description}</p>

            <br />
            <br />
            {user ? (
              <div class="control">
                <button class="btn" onClick={contactwithOwner}>
                  <span>Contact owner</span>
                </button>

                <button class="btn" onClick={addPropertyToFavorite}>
                  <span>Add to favourite</span>
                </button>
              </div>
            ) : (
              <div class="control">
                <Link to="/login">
                  <button class="btn">
                    <span>Login to contact owner</span>
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div class="product-image">
            <img src={propertyData.images[0]} alt="" />
            <div className="column carousal">
              <Carousel>{div(propertyData)}</Carousel>
            </div>

            <div class="info">
              <h2>Details</h2>
              <ul>
                <li>
                  <strong>
                    <BsCurrencyDollar />
                    &nbsp;
                  </strong>
                  {propertyData.price}{" "}
                </li>
                <br></br>
                <li>
                  <strong>
                    <BiBed />
                    &nbsp;
                  </strong>
                  {propertyData.bedrooms}
                </li>
                <br></br>
                <li>
                  <strong>
                    <GiBathtub />
                    &nbsp;
                  </strong>{" "}
                  {propertyData.bathrooms}
                </li>
                <br></br>
                <li>
                  <strong>
                    <MdMyLocation />
                    &nbsp;
                  </strong>{" "}
                  {propertyData.address}
                </li>
                <br></br>
                <li>
                  <strong>
                    <MdLocationCity />
                    &nbsp;
                  </strong>
                  {propertyData.city}{" "}
                </li>
                <br></br>
                <li>
                  <strong>
                    <GoLocation />
                    &nbsp;
                  </strong>{" "}
                  {propertyData.zipcode}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="carousal">
          <Carousel>{div(propertyData)}</Carousel>
        </div>
      </section>
    </main>
  );
};

export default PropertiesDetail;
