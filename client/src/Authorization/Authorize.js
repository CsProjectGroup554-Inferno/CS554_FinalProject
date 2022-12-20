import { auth } from "./FirebaseConfig";
import React, { useState, useEffect } from "react";
import { ProgressBar } from 'react-loader-spinner'

const AuthorizeContext = React.createContext();

const AuthorizeProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      
      let data3 = {
        userdata : user
      };
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(data3)
      );
      setLoading(false);
    });
  }, []);

  if (loading) {
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
  }

  return <AuthorizeContext.Provider value={{ user }}>{props.children}</AuthorizeContext.Provider>;
};

export { AuthorizeContext, AuthorizeProvider };
