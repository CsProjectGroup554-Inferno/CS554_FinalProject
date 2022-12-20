import { AuthorizeContext } from "../Authorization/Authorize";
import React, { useContext, useState, useCallback } from "react";
import ReactTooltip from "react-tooltip";
import { useDropzone } from "react-dropzone";
import serverRequest from "../serverRequest";
import Profile from "./Profile";
import { BiImageAdd } from "react-icons/bi";
import { ProgressBar } from 'react-loader-spinner'

const AddProperty = (props) => {
  const { user } = useContext(AuthorizeContext);
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getbase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => resolve([file.name, "fieldName", event.target.result]);
      reader.onerror = reject;
    });
  };

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    const getData = async (Files) => {
      return Promise.all(Files.map((file) => getbase64(file)));
    };

    for (let file of rejectedFiles) {
      for (let error of file.errors) {
        alert.current.error(file.file.name + " : " + error.message);
      }
    }

    let files = await getData(acceptedFiles);
    // set state: add to previous state
    setImageData((prevState) => {
      let array = prevState.concat(files);
      // remove duplicate
      let set = new Set();
      for (let i = array.length - 1; i >= 0; i--) {
        if (set.has(array[i][2])) {
          array.splice(i, 1);
        } else {
          set.add(array[i][2]);
        }
      }
      return array;
    });
  }, []);

  const removeImage = (idx) => {
    setImageData((prevState) => {
      let array = [...prevState];
      array.splice(idx, 1);
      return array;
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    minSize: 0,
    maxSize: 5242880,
  });

  let preview =
    imageData &&
    imageData.length > 0 &&
    imageData.map((key, idx) => {
      return (
        (
          <div key={idx} className="col-3 mb-2">
            <div className="img-preview-container avatar-container">
              <img className="img-fluid img-preview" src={key[2]} alt={key[0]} />
              <button type="button" onClick={() => removeImage(idx)} data-idx={idx} className="btn btn-danger btn-sm btn-round btn-shadow btn-delete-preview position-absolute">
                Delete
              </button>
            </div>
          </div>
        ) || null
      );
    });
  const uploadImage = (
    <>
      <label htmlFor="images">Images</label>
      <div {...getRootProps()} className="image-upload property-card property-add align-self-center d-flex align-items-center justify-content-center mb-3">
        <input id="images" {...getInputProps()} />
        <div>
          <p>
            <i className="fas fa-file-image"></i>
          </p>
          <p style={{ fontSize: "x-large" }}>
            <BiImageAdd />
            Click here or drop file to upload photos!
          </p>
        </div>
      </div>
    </>
  );

  const addProperty = async (event) => {
    setLoading(true);
    event.preventDefault();

    let eventInfo = event.target.elements;

    let data = {
      title: eventInfo.title.value,
      description: eventInfo.description.value,
      city: eventInfo.city.value,
      price: eventInfo.price.value,
      bedrooms: eventInfo.bedrooms.value,
      bathrooms: eventInfo.bathrooms.value,
      size: eventInfo.size.value,
      zipcode: eventInfo.zipcode.value,
      address: eventInfo.address.value,
    };

    let time = new Date();
    data.date = Date.parse(time);
    data.images = imageData;

    try {

      // TODO move these checker into function
      if (!data.title) throw Object.assign(new Error("title data does not exist"), { code: null });
      if (!data.address) throw Object.assign(new Error("address data does not exist"), { code: null });
      if (data.title.length > 70 || typeof data.title != "string") throw Object.assign(new Error("title data too long or invalid"), { code: null });
      if (!data.description) throw Object.assign(new Error("description data does not exist"), { code: null });
      if (data.description.length > 3000 || typeof data.description != "string" ) throw Object.assign(new Error("description data too long or invalid"), { code: null });
      if (!data.bedrooms) throw Object.assign(new Error("bedroom data does not exist"), { code: null });
      if (parseInt(data.bedrooms) < 1 || parseInt(data.bedrooms) > 10) throw Object.assign(new Error("bedroom data is invalid"), { code: null });
      if (!data.bathrooms) throw Object.assign(new Error("bathroom data does not exist"), { code: null });
      if (data.images.length <1 ) throw Object.assign(new Error("Images data required"), { code: null });
      if (!data.size) throw Object.assign(new Error("size data does not exist"), { code: null });
      if (parseInt(data.size) < 0 ) throw Object.assign(new Error("size data is invalid"), { code: null });
      if (!data.price) throw Object.assign(new Error("price data does not exist"), { code: null });
      if (parseInt(data.price) < 0) throw Object.assign(new Error("price invalid"), { code: null });
      if (!data.zipcode) throw Object.assign(new Error("zipcode data does not exist"), { code: null });
      if (!data.city || typeof data.description != "string") throw Object.assign(new Error("City data does not exist or is invalid"), { code: null });
      if (data.zipcode.length !== 5 || typeof data.description != "string") throw Object.assign(new Error("Zipcode data is invalid"), { code: null });

      await serverRequest.addProperty(user, data);

      setLoading(false);
      props.history.push("/profile");
    } catch (error) {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="load">
        <ProgressBar 
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor='#F4442E'
          barColor='white'
        /> Loading ...
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Profile />
        </div>
        <div className="col-md-9  mt-3" style={{ padding: "30px" }}>
          <h1 style={{ textAlign: "center" }}>Property Data</h1>
          <form onSubmit={addProperty}>
            <div className="row form-group-add">
              <div className="col-md-12 ">
                <div className="form-group-add-content">
                  <label htmlFor="title">Title</label>
                  <input className="form-control" id="title" name="title" placeholder="title" />
                </div>
              </div>

              <div className="col-md-12 ">
                <div className="form-group-add-content">
                  <label htmlFor="description">Description</label>
                  <textarea id="description" rows="10" className="form-control" name="description" type="text" placeholder="description" />
                </div>
              </div>

              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="city">City</label>
                  <input className="form-control" name="city" id="city" placeholder="city" type="text" />
                </div>
              </div>

              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="price">Price</label>
                  <input className="form-control" name="price" id="price" placeholder="price" type="number" />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="bedrooms">Bedroom</label>
                  <input className="form-control" id="bedrooms" name="bedrooms" type="number" placeholder="3" />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="bathrooms">Bathroom</label>
                  <input className="form-control" id="bathrooms" name="bathrooms" type="number" placeholder="1" />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="size">Size</label>
                  <input className="form-control" id="size" name="size" type="number" placeholder="1,100 sq ft" />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="address">Address</label>
                  <input className="form-control" id="address" name="address" type="text" placeholder="1" />
                </div>
              </div>
              <div className="col-md-3 ">
                <div className="form-group-add-content">
                  <label htmlFor="zipcode">Zip-Code</label>
                  <input className="form-control" id="zipcode" name="zipcode" type="number" placeholder="07306" />
                </div>
              </div>
              <div className="col-md-12 ">
                <br />
                <br />
                {uploadImage}
                {preview ? <div className="row mb-2">{preview}</div> : null}
              </div>
            </div>

            <button className="btn btn-primary " style={{ width: "260px", backgroundColor: "transparent", margin: "50px", border: "2px solid white" }} type="submit">
              Post
            </button>
          </form>
          <ReactTooltip />
        </div>
      </div>
    </div>
  );
};
// };

export default AddProperty;
