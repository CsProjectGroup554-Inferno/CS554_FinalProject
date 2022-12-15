import Profile from "./Profile";
import serverRequest from "../serverRequest";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const favorites = await serverRequest.getFavoritesList();
        setFavorites(favorites);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  let removeFavorite = async (id) => {
    try {
      await serverRequest.removeFavorite(id);
      let newFavorites = favorites.filter((item) => item._id !== id);
      setFavorites(newFavorites);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Profile />
        </div>
        <div className="col-md-9">
          <h1>Favorites</h1>
          {favorites.map((data) => (
            <Link to={"/properties/" + data._id} key={data._id}>
              <div key={data._id} className="favoriteCard my-5">
                <h1>{data.title}</h1>
                <p>{data.description}</p>
                <span className="mx-3">price: {data.price}</span>
                <span className="mx-3">bedrooms: {data.bedrooms}</span>
                <span className="mx-3">bathrooms: {data.bathrooms}</span>
                <span className="mx-3">city: {data.city}</span>
                <span className="mx-3">address: {data.address}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
