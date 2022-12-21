import React, { useContext, useState, useEffect } from "react";
import { AuthorizeContext } from "../Authorization/Authorize";
import serverRequest from "../serverRequest";
import Profile from "./Profile";
import { useParams } from "react-router-dom";

const EditProperty = () => {
  const { id } = useParams();
  const { user } = useContext(AuthorizeContext);
  const [loading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await serverRequest.getPropertyById(id);
        setPropertyData(response);
        console.log(response);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        alert(e);
      }
    };
    fetchProperty();
  }, []);

  const editProperty = async (e) => {
    e.preventDefault();
    try {
      const data = e.target.elements;
      setLoading(true);
      const response = await serverRequest.editProperty(id, user, data);
      setLoading(false);
      alert("Property edited successfully");
    } catch (e) {
      setLoading(false);
      alert(e.response.data.error);
    }
  };

  if (!propertyData)
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Profile />
          </div>
          <div className="col-md-9">
            <h1>Property not found</h1>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Profile />
        </div>
        <div className="col-md-9">
          <h1 style={{ textAlign: "center" }}>Edit Property</h1>
          <form onSubmit={editProperty}>
            <div className="row form-group-add">
              <div className="col-md-12 ">
                <div className="form-group-add-content">
                  <label htmlFor="title">Title</label>
                  <input className="form-control" id="title" name="title" placeholder="title" type="text" defaultValue={propertyData.title} />
                </div>
              </div>

              <div className="col-md-12 ">
                <div className="form-group-add-content">
                  <label htmlFor="description">Description</label>
                  <textarea id="description" rows="10" className="form-control" name="description" type="text" placeholder="description" defaultValue={propertyData.description} />
                </div>
              </div>

              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="city">City</label>
                  <input className="form-control" name="city" id="city" placeholder="city" type="text" defaultValue={propertyData.city} />
                </div>
              </div>

              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="price">Price</label>
                  <input className="form-control" name="price" id="price" placeholder="price" type="number" defaultValue={propertyData.price} />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="bedrooms">Bedroom</label>
                  <input className="form-control" id="bedrooms" name="bedrooms" type="number" placeholder="3" defaultValue={propertyData.bedrooms} />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="bathrooms">Bathroom</label>
                  <input className="form-control" id="bathrooms" name="bathrooms" type="number" placeholder="1" defaultValue={propertyData.bathrooms} />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="size">Size</label>
                  <input className="form-control" id="size" name="size" type="number" placeholder="1,100 sq ft" defaultValue={propertyData.size} />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="address">Address</label>
                  <input className="form-control" id="address" name="address" type="text" placeholder="1" defaultValue={propertyData.address} />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="zipcode">Zip-Code</label>
                  <input className="form-control" id="zipcode" name="zipcode" type="number" placeholder="07306" defaultValue={propertyData.zipcode} />
                </div>
              </div>
              {/* <div className="col-md-12  visually-hidden">
                <br />
                <br />
                {uploadImage}
                {preview || existing_preview ? (
                  <div className="row mb-2">
                    {existing_preview}
                    {preview}
                  </div>
                ) : null}
              </div> */}
            </div>

            <button className="btn btn-primary " style={{ width: "260px", backgroundColor: "transparent", margin: "50px", border: "2px solid white" }} type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;
