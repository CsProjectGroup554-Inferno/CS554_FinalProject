import { useState, useEffect, useContext } from "react";
import { AuthorizeContext } from "../Authorization/Authorize";
import serverRequest from "../serverRequest";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { BiBed, BiFontSize, BiHeart } from "react-icons/bi";
import { GiBathtub } from "react-icons/gi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
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

  const handleDelete = async (event) => {
    event.preventDefault();
    let propertyId = event.target.getAttribute("data-property");
    try {
      await serverRequest.deleteProperty(propertyId, user);
      const { data: resData } = await serverRequest.getUser(user);
      setPropertyData(resData.property);
      alert.success("deleted");
    } catch (e) {
      alert.error(e.message);
    }
  };

  let li = null;

  // const buildListItem = (property) => {
  //   return (
  //     <div key={property._id} className="row property-card mb-4">
  //       <div className="col-lg-6 col-6 pl-0">
  //         <Link to={"/property/" + property._id}>
  //           {property.album.length === 0 ? <img src="/img/default_property.jpg" className="card-img-left" alt="property" /> : <img src={property.album[0]} className="card-img-left" alt="property" />}
  //         </Link>
  //       </div>
  //       <div className="col-lg-6 col-6 py-3">
  //         <Link to={"/property/" + property._id}>
  //           <h1 className="display-4 title">{property.title}</h1>
  //         </Link>
  //         {property.description ? <p className="description">{property.description}</p> : null}

  //         {property.price || property.zipcode || property.type || property.bedroom || property.bath ? (
  //           <div className="icon-group">
  //             <p>
  //               {property.price ? (
  //                 <>
  //                   <i className="fas fa-dollar-sign"></i>
  //                   {property.price}
  //                 </>
  //               ) : null}
  //               {property.zipcode ? (
  //                 <>
  //                   <i className="fas fa-map-marker-alt"></i>
  //                   {property.zipcode}
  //                 </>
  //               ) : null}
  //               {property.type ? (
  //                 <>
  //                   <i className="fas fa-building"></i>
  //                   {property.type}
  //                 </>
  //               ) : null}
  //               {property.bedroom ? (
  //                 <>
  //                   <i className="fas fa-bed"></i>
  //                   {property.bedroom}
  //                 </>
  //               ) : null}
  //               {property.bath ? (
  //                 <>
  //                   <i className="fas fa-bath"></i>
  //                   {property.bath}
  //                 </>
  //               ) : null}
  //             </p>
  //           </div>
  //         ) : null}
  //         <Link to={"/account/property/" + property._id} className="btn btn-primary btn-sm btn-round btn-shadow btn-edit-property position-absolute">
  //           edit
  //         </Link>
  //         <button type="button" onClick={handleDelete} data-property={property._id} className="btn btn-danger btn-sm btn-round btn-shadow btn-delete-property position-absolute">
  //           delete
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  div =
    propertyData &&
    propertyData.map((property) => {
      return (
        <>
          <div key={property._id} className="container-prop">
            <div className="box">
              <Link to={"/properties/" + property._id}>
                <div className="top">
                  <img src={property.imageData[0]} alt="" />
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
                  </div>
                  <div>
                    <span>Bathrooms</span>
                    <div>
                      <GiBathtub />
                      <span>{property.bathrooms}</span>
                    </div>
                  </div>
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
                  <div></div>
                  <div>
                    <span>City</span>
                    <div>
                      <GoLocation />
                      <span>{property.city}</span>
                    </div>
                  </div>
                </div>
                <div className="price">
                  <span>For Rent</span>
                  <BsCurrencyDollar />
                  <b>{property.price}</b>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });

  li =
    propertyData &&
    propertyData.map((property) => {
      // return buildListItem(property);
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
      <div className="row property-card property-add mb-3">
        <Link className="align-self-center d-flex align-items-center justify-content-center" to="/profile/properties/add">
          <button className="btn my-3 btn-secondary" style={{ width: "260px", backgroundColor: "transparent" }}>
            Add Property
          </button>
        </Link>
      </div>
      {div}
    </>
  );
};

export default MyProperty;
