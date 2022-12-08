import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import serverRequest from "../serverRequest";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");

  useEffect(() => {
    const getProperties = async () => {
      const properties = await serverRequest.getPropertiesByCity(city);
      console.log(properties);
    };
    getProperties();
  }, [city]);
  if (city === null) {
    return (
      <>
        <div className="row">
          <div className="img-column">
            <Link to="/properties?city=Newark">
              <img className="circular--square" src="./img/6.jpg" alt="txt" />
              <h6 className="img-circlle-title">Newark</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?city=Hoboken">
              <img className="circular--square" src="./img/7.jpg" alt="txt" />
              <h6 className="img-circlle-title">Hoboken</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?city=Jersey City">
              <img className="circular--square" src="./img/8.jpg" alt="txt" />
              <h6 className="img-circlle-title">Jersey City</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?city=Paterson">
              <img className="circular--square" src="./img/9.jpg" alt="txt" />
              <h6 className="img-circlle-title">Paterson</h6>
            </Link>
          </div>

          <div className="img-column">
            <Link to="/properties?city=Trenton">
              <img className="circular--square" src="./img/10.jpg" alt="txt" />
              <h6 className="img-circlle-title">Trenton</h6>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <h1>Properties</h1>
    </div>
  );
};

export default Properties;
