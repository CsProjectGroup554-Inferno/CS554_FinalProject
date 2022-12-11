import { AuthorizeContext } from "../Authorization/Authorize";
//import React, { useContext, useState, useCallback, useRef } from "react";
import React, { useContext, useState, useCallback } from "react";
import ReactTooltip from "react-tooltip";
//import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
//import { useAlert } from "react-alert";
import serverRequest from "../serverRequest";

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
    accept: "image/jpeg, image/png",
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
                delete
              </button>
            </div>
          </div>
        ) || null
      );
    });
  const uploadImage = (
    <>
      <label htmlFor="images">images</label>
      <div {...getRootProps()} className="image-upload property-card property-add align-self-center d-flex align-items-center justify-content-center mb-3">
        <input id="images" {...getInputProps()} />
        <div>
          <p>
            <i className="fas fa-file-image"></i>
          </p>
          <p>Click here or drop to upload photos!</p>
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
      //type: eventInfo.type.value,
    };

    let time = new Date();
    data.date = Date.parse(time);
    data.images = imageData;

    try {
      // TODO move these checker into function
      //if (!data.title) throw Object.assign(new Error("title not exist"), { code: null });
      //if (data.title.length > 70) throw Object.assign(new Error("title too long"), { code: null });
      //if (!data.description) throw Object.assign(new Error("description not exist"), { code: null });
      //if (data.description.length > 1000) throw Object.assign(new Error("description too long"), { code: null });
      // if (!data.bedroom) throw Object.assign(new Error("bedroom not exist"), { code: null });
      // if (parseInt(data.bedroom) < 1 || parseInt(data.bedroom) > 10) throw Object.assign(new Error("bedroom number invalid"), { code: null });
      // if (!data.bath) throw Object.assign(new Error("bath not exist"), { code: null });

      // if (parseInt(data.bath) < 0 || parseInt(data.bath) > 10) throw Object.assign(new Error("bath number invalid"), { code: null });
      // if (!data.price) throw Object.assign(new Error("price not exist"), { code: null });
      // if (parseInt(data.price) < 0) throw Object.assign(new Error("price invalid"), { code: null });
      // if (!data.zipcode) throw Object.assign(new Error("zipcode not exist"), { code: null });
      // if (data.zipcode.length !== 5) throw Object.assign(new Error("zipcode invalid"), { code: null });
      // if (!data.type) throw Object.assign(new Error("type is not exist"), { code: null });
      // if (data.type !== "apartment" && data.type !== "house") throw Object.assign(new Error("type is invalid"), { code: null });

      await serverRequest.addProperty(user, data);

      setLoading(false);
      //alert.current.success("post sucessfully");
      props.history.push("/profile");
    } catch (error) {
      setLoading(false);
      //alert.current.error(error.message);
    }
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
    <div>
      <title>Create property </title>
      <h1>Post Property</h1>
      <form onSubmit={addProperty}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input className="form-control" id="title" name="title" placeholder="title" data-tip="title length must less than 70" />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="10" className="form-control" name="description" type="text" placeholder="description" data-tip="description length need to less than 1000" />
            </div>
          </div>

          {/* <div className="col-md-12">
            {uploadImage}
            {preview ? <div className="row mb-2">{preview}</div> : null}
          </div> */}

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input className="form-control" name="city" id="city" placeholder="city" type="text" data-tip="City " />
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input className="form-control" name="price" id="price" placeholder="price" type="number" data-tip="price need to greater than 0" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="bedrooms">Bedroom</label>
              <input className="form-control" id="bedrooms" name="bedrooms" type="number" placeholder="3" data-tip="bedroom need to greater than 0 and less than 10" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="bathrooms">Bath</label>
              <input className="form-control" id="bathrooms" name="bathrooms" type="number" placeholder="1" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="size">Size</label>
              <input className="form-control" id="size" name="size" type="number" placeholder="1,503 sq ft" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="address">address</label>
              <input className="form-control" id="address" name="address" type="text" placeholder="1" />
            </div>
          </div>
          <div className="col-md-12">
            {uploadImage}
            {preview ? <div className="row mb-2">{preview}</div> : null}
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="zipcode">zipcode</label>
              <input className="form-control" id="zipcode" name="zipcode" type="number" placeholder="07306" data-tip="length must equal to 5" />
            </div>
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Post
        </button>
      </form>
      <ReactTooltip />
    </div>
  );
};
// };

export default AddProperty;
