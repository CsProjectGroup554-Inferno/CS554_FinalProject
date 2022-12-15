import { createRef, useContext } from "react";
import { AuthorizeContext } from "../Authorization/Authorize";
// import { auth } from "../Authorization/FirebaseConfig";
import { useState, useEffect } from "react";
import serverRequest from "../serverRequest";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthorizeContext);
  const [userData, setUserData] = useState(null);
  const closeChangePasswordModal = createRef();
  useEffect(() => {
    if (user) {
      let getData = async () => {
        let data = await serverRequest.getUserById(user.uid);
        setUserData(data);
        console.log(data);
      };
      getData();
    }
  }, [user]);

  let handleChangePassword = async (e) => {
    e.preventDefault();
    closeChangePasswordModal.current.click();
    let { oldPassword, newPassword, confirmPassword } = e.target.elements;
    try {
      await serverRequest.changePassword(oldPassword.value, newPassword.value, confirmPassword.value);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            {userData?.email ? (
              <div className=" mt-4">
                <p>
                  <i className=""></i>
                  {userData.email}
                </p>
              </div>
            ) : null}
            <div>
              <Link className="" to="/profile/myProperties">
                <button className="btn my-3 btn-secondary" style={{ width: "180px" }}>
                  My property
                </button>
              </Link>
            </div>
            <div>
              <Link className="" to="/profile/favorites">
                <button className="btn my-3 btn-secondary" style={{ width: "180px" }}>
                  My favorites
                </button>
              </Link>
            </div>
            <div>
              <Link className="card-body" to="/profile/properties/add">
                <button className="btn my-3 btn-secondary" style={{ width: "180px" }}>
                  Add Property
                </button>
              </Link>
            </div>
            {user.providerData[0].providerId === "password" ? (
              <div>
                <button className="btn my-3 btn-secondary" style={{ width: "180px" }} data-bs-toggle="modal" data-bs-target="#change-password-modal">
                  Change password
                </button>
              </div>
            ) : null}
          </div>
          <div className="col-md-9"></div>
        </div>
      </div>
      {/* bootstrap modal to change password */}
      {user.providerData[0].providerId === "password" && (
        <div className="modal fade" id="change-password-modal" tabIndex="-1" role="dialog" aria-labelledby="modal-change-password" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="modal-change-password">
                  Change Password
                </h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <form onSubmit={handleChangePassword}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="oldPassword">Old password</label>
                    <input type="password" className="form-control" id="oldPassword" name="oldPassword" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">New password</label>
                    <input className="form-control" id="newPassword" name="newPassword" type="password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input className="form-control" id="confirmPassword" name="confirmPassword" type="password" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <button type="button" ref={closeChangePasswordModal} className="btn btn-link ml-auto" data-bs-dismiss="modal">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
