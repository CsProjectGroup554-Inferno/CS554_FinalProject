import { useState, useEffect, useContext } from "react";
import { AuthorizeContext } from "../Authorization/Authorize";
import serverRequest from "../serverRequest";
import { Link } from "react-router-dom";
import { BiBed, BiFontSize } from "react-icons/bi";
import { GiBathtub } from "react-icons/gi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import Profile from "./Profile";
const MyProperty = (props) => {
  const { user } = useContext(AuthorizeContext);
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  let div = null;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const resData = await serverRequest.getUser(user);
        setPropertyData(resData.properties);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const handleDelete = async (propertyId) => {
    try {
      await serverRequest.deleteProperty(propertyId, user);
      const resData = await serverRequest.getUser(user);
      setPropertyData(resData.properties);
      alert("Property deleted");
    } catch (e) {
      alert(e.message);
    }
  };


  div =
    propertyData &&
    propertyData.map((property) => {
      return (
        <>

          <div key={property._id} className="container-prop" style={{ marginTop: "20px" }}>
            <button className="btn btn-danger mb-2" style={{ float: "right", marginRight: "50px" }} onClick={() => handleDelete(property._id)}>
              Remove
            </button>
            <div className="box" style={{ marginLeft: "30px", marginRight: "30px", width: "100%" }}>
              <Link to={"/properties/" + property._id}>
                <div className="top">
                  <img src={property.imageData[0]} alt="imgprop" />
                </div>
              </Link>
              <div className="bottom">
                <h1>
                  <b>Title: </b>
                  {property.title}
                </h1>
                <p className="about-prop">
                  <b>About property: </b>
                  {property.description}
                </p>
                <div className="advants">
                  <div>
                    <span>Bedrooms</span>
                    <div>
                      <BiBed />
                      <span>{property.bedrooms}</span>
                    </div>
                  </div><br/>
                  <div>
                    <span>Bathrooms</span>
                    <div>
                      <GiBathtub />
                      <span>{property.bathrooms}</span>
                    </div>
                  </div><br/>
                  <div>
                    <span>Area</span>
                    <div>
                      <BiFontSize />
                      <span>
                        {property.size}
                        <span>Sq Ft</span>
                      </span>
                    </div>
                  </div>
                  <div></div><br/>
                  <div>
                    <span>City</span>
                    <div>
                      <GoLocation />
                      <span>{property.city}</span>
                    </div>
                  </div>
                </div><br/>
                <div className="price">
                  <span>Rent</span>
                  <BsCurrencyDollar />
                  <b>{property.price}</b>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });


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
    <>
      <title>My property - NJ Rental</title>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Profile />
          </div>

          <div className="col-md-9" style={{ padding: "30px", marginTop: "20px" }}>
            <h1 style={{ textAlign: "center" }}>My Properties</h1>
            {propertyData.length === 0 ? (
              <div className="row property-card property-add mb-3">
                <Link className="align-self-center d-flex align-items-center justify-content-center" to="/profile/properties/add">
                  <button className="btn my-3 btn-secondary" style={{ width: "260px", backgroundColor: "transparent" }}>
                    Add Property
                  </button>
                </Link>
              </div>
            ) : null}
            {div}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProperty;
