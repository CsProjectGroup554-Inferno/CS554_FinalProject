import { useContext } from "react";
import { AuthorizeContext } from "../Authorization/Authorize";
import { auth } from "../Authorization/FirebaseConfig";
import { useState, useEffect } from "react";
import serverRequest from "../serverRequest";

const Profile = () => {
  const { user } = useContext(AuthorizeContext);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (user) {
      serverRequest.getUserById(user.uid).then((data) => {
        setUserData(data);
      });
    }
  }, [user]);
  return (
    <>
      <div className="container">
        <div className="row">
          {/* profile card */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Profile</h5>
                <p className="card-text">email: {userData?.email}</p>
              </div>
              <div className="card-body">
                {/* button for properties */}
                <button className="btn btn-primary">Properties</button>
              </div>
              <div className="card-body">
                {/* button for favorites */}
                <button className="btn btn-primary">Favorites</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
