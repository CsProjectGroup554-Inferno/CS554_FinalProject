import { AuthorizeContext } from "../Authorization/Authorize";
import { useContext } from "react";
import ReactTooltip from "react-tooltip";

const AddProperty = () => {
  const { user } = useContext(AuthorizeContext);
  //console.log(user)

  // const addProperty = async (event) => {
  //   event.preventDefault();
  //   let eventInfo = event.target.elements;

  //   let data = {
  //     title: eventInfo.title.value,
  //   };

  return (
    <div>
      <title>Create property </title>
      <h1>Post Property</h1>
      {/* <form onSubmit={addProperty}> */}
      <form onSubmit={AddProperty}>
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
              <input className="form-control" name="city" id="city" placeholder="city" type="text" data-tip="price need to greater than 0" />
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
              <label htmlFor="bedroom">Bedroom</label>
              <input className="form-control" id="bedroom" name="bedroom" type="number" placeholder="3" data-tip="bedroom need to greater than 0 and less than 10" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="bath">Bath</label>
              <input className="form-control" id="bath" name="bath" type="number" placeholder="1" />
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
