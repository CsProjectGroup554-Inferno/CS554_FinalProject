import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect( () => {
    setUserName(
       JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).userdata.email
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="imgprop" />
      <h1>
        Welcome, <span style={{color: "yellow"}}>{userName}!</span>
      </h1>
      <h2>Please select a chat to Start messaging.</h2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
