import React, { useState, useEffect } from "react";
import styled from "styled-components";
import avatar from "../../assets/avatar1.webp";
import avatar2 from "../../assets/avtar4.png";

export default function Contacts({ contacts, changeChat, indexx, propertyContact }) {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);


  
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    setCurrentUserName(data.email);
    setCurrentUserImage(avatar2);
   

  }, []);

  
  const changeCurrentChat = (index, contact) => {
    console.log(index + "&&" + JSON.stringify(contact))
    setCurrentSelected(index);
    changeChat(contact);
  };
  useEffect(() => {
    console.log("hhhh")
    console.log(indexx)
    console.log(JSON.stringify(contacts))
    const data1 = JSON.parse(
      localStorage.getItem(process.env.CONNECT_WITH_OWNER)
    );
    if (data1) {
      changeCurrentChat(indexx, propertyContact)
    }


  }, []);
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">

            <h3>NJRental</h3>
          </div>
          <div className="contacts">
            {contacts.filter(user => user.email !== currentUserName).map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`${avatar}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    {contact.email}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`${avatar2}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              {currentUserName}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }


  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 2rem;
        }
      }
      .username {
        font-size: 12px;
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      font-size: 15px;
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
