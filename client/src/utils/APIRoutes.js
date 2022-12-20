export const host = process.env.PORT ? process.env.PORT + "/api" : "http://localhost:4000/api";
export const allUsersRoute = `${host}/users/allusers`;
export const logoutRoute = `${host}/auth/logout`;
export const sendMessageRoute = `${host}/messages/addmsg`;
export const recieveMessageRoute = `${host}/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
