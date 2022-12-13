import { useContext } from "react";
import { AuthorizeContext } from "../Authorization/Authorize";
// import { auth } from "../Authorization/FirebaseConfig";
import { useState, useEffect } from "react";
import serverRequest from "../serverRequest";
import socket from "../socket";

const Csocket = () => {
    const { user } = useContext(AuthorizeContext);
    const [userData, setUserData] = useState(null);
    const [usersList, addUsers] = useState([]);
    useEffect(() => {
        if (user) {
            let getData = async () => {
                let data = await serverRequest.getUserById(user.uid);
                setUserData(data);
                console.log(data);
                console.log("hhhhhh")
                const dd = data.email;
                socket.auth = { dd };
            };
            getData();
        }
    }, [user]);

    socket.connect();

    socket.on("users", (users) => {
        users.forEach((user) => {
            user.self = user.userID === socket.id;
        });
        users = users.sort((a, b) => {
            if (a.self) return -1;
            if (b.self) return 1;
            if (a.username < b.username) return -1;
            return a.username > b.username ? 1 : 0;
        });
        addUsers(users);
    });
    socket.on("user connected", (user) => {
        addUsers([...usersList, user]);
    });
    return (
        console.log("")
    );
};

export default Csocket;