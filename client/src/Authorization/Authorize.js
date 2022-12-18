import { auth } from "./FirebaseConfig";
import React, { useState, useEffect } from "react";

const AuthorizeContext = React.createContext();

const AuthorizeProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(user)
      );
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthorizeContext.Provider value={{ user }}>{props.children}</AuthorizeContext.Provider>;
};

export { AuthorizeContext, AuthorizeProvider };
