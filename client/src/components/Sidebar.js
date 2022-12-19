import React from "react";

const Sidebar = (props) => {
  const userList = props.connectedUsers;
  const un = props.username;


  let selectedUser = "";

  const userName_from_click = (e) => {
    selectedUser = e.target.innerText;
    let selectedUserDetails = userList.find(
      (user) => user.username === selectedUser
    );

    console.log("In sidebar the user details:", selectedUserDetails);
    props.selectUser(selectedUserDetails);
  };

  let showUsers = userList.filter(user => user.username !== un).map((user) => {

    return (
      <div
        key={user.key}
        className="user-list-el"
        onClick={(e) => userName_from_click(e)}
      >


        {user.username}
      </div>
    );
  });
  console.log("Userlist in sidebar component:", userList);
  return <div>{showUsers}</div>;
};

export default Sidebar;