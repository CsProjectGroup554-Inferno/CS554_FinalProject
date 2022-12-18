import React, { useState, useEffect /*useRef */ } from "react";
import serverRequest from "../serverRequest";
import { Link } from "react-router-dom";
// import { useAlert } from 'react-alert'
import { Dropdown } from "react-bootstrap";
import { BiBed, BiFontSize,BiHeart } from "react-icons/bi";
import { GiBathtub } from "react-icons/gi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdLocationCity, MdMyLocation } from "react-icons/md";

const Property = (props) => {
  const [propertyData, setPropertyData] = useState([]);
  const [allDBData, setProperty] = useState([]);
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(true);
  // const alert = useRef(useAlert());
  const urlParams = new URLSearchParams(window.location.search);
  let page = urlParams.get("page") || 1;
  let filter = urlParams.get("filter") || "null";
  let sort = urlParams.get("sort") || "null";
  let div = null;
  let d = null;
  let pagination = null;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const un = await serverRequest.getAllProperty(1, "", "");
        const allDBData = await getUnique(un.properties, "city");
        const propData = await serverRequest.getAllProperty(page, filter, sort);
        setPropertyData(propData.properties);
        setProperty(allDBData);
        setPageData({ next: propData.next, prev: propData.prev });
        setLoading(false);
      } catch (e) {
        // alert.current.error(e.message)
        setLoading(false);
      }
    }
    async function getUnique(arr, comp) {
      // store the comparison  values in array
      var unique = arr
        .map((e) => e[comp])

        // store the indexes of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the false indexes & return unique objects
        .filter((e) => arr[e])
        .map((e) => arr[e]);

      return unique;
    }
    fetchData();
  }, [props, filter, sort, page]);

  div =
    propertyData &&
    propertyData.map((property) => {
      return (
        <><div key={property._id} className="container-prop">
          <div className="box">
            <Link to={"/properties/" + property._id}>
              <div className="top">
                <img src={property.imageData[0]} alt="" />
                <span className="heart-icon">
                  <BiHeart/>
                </span>
              </div>
            </Link>
            <div className="bottom">
              <h1><b>Title: </b>{property.title}</h1>
              <p className="about-prop" ><b>About property: </b>{property.description}</p>
              <div className="advants">
                <div>
                  <span>Bedrooms</span>
                  <div>
                    <BiBed/>
                    <span>{property.bedrooms}</span>
                  </div>
                </div>
                <div>
                  <span>Bathrooms</span>
                  <div>
                    <GiBathtub/>
                    <span>{property.bathrooms}</span>
                  </div>
                </div>
                <div>
                  <span>Area</span>
                  <div>
                    <BiFontSize/>
                    <span>
                      {property.size}
                      <span>Sq Ft</span>
                    </span>
                  </div>
                </div><div></div>
                <div>
                  <span>City</span>
                  <div>
                    <GoLocation/>
                    <span>
                      {property.city}
                    </span>
                  </div>
                </div>
              </div>
              <div className="price">
                <span>For Rent</span>
                <BsCurrencyDollar/><b>{property.price}</b>
              </div>
            </div>
          </div>
        </div></>
      );
    });

  d =
    allDBData.length > 0 &&
    allDBData.map((property, i) => {
      return (
        <Dropdown.Item key={property.city} href={"?filter=" + property.city + "&sort=" + sort}>
          {property.city}
        </Dropdown.Item>
      );
    });

  const buildPagination = (pageData) => {
    let prev = null;
    let curr = null;
    let next = null;
    const currentPageNumber = parseInt(page);
    const prevPageNumber = currentPageNumber - 1;
    const nextPageNumber = currentPageNumber + 1;

    if (pageData.prev) {
      prev = (
        <li className="page-item">
          <a href={"?page=" + prevPageNumber + "&filter=" + filter + "&sort=" + sort} className="page-link">
            <i className="fa fa-angle-left"></i>
            <span className="sr-only">Previous page</span>
          </a>
        </li>
      );
    }

    if (pageData.next) {
      next = (
        <li className="page-item">
          <a href={"?page=" + nextPageNumber + "&filter=" + filter + "&sort=" + sort} className="page-link">
            <i className="fa fa-angle-right"></i>
            <span className="sr-only">Next page</span>
          </a>
        </li>
      );
    }

    if (pageData.next || pageData.prev) {
      curr = (
        <li className="page-item {{@active}}">
          <Link to={"?page=" + page + "&filter=" + filter + "&sort=" + sort} className="page-link" aria-label={"go to page " + currentPageNumber}>
            {currentPageNumber}
          </Link>
        </li>
      );
    }

    if (pageData.next || pageData.prev) {
      return (
        <nav>
          <ul className="pagination justify-content-center">
            {prev}
            {curr}
            {next}
          </ul>
        </nav>
      );
    }
  };

  if (pageData) {
    pagination = buildPagination(pageData);
  }

  if (loading) {
    return (
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (!(Array.isArray(propertyData) && propertyData.length) && !(filter || sort)) {
    return (
      <section className="section">
        <div className="container">
          <h1>No Property!</h1>
        </div>
      </section>
    );
  }

  return (
    <main>
      <div className="row-filter">
        <div className="filter-column">
          <div className="dropdown pr-2">
            <Dropdown>
              <Dropdown.Toggle className="btn btn-default dropdown-toggle  filter-dropdown " variant="success" id="dropdown-basic">
                Filter by city
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">{d}</Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="filter-column">
          <div className="dropdown pr-2">
            <Dropdown>
              <Dropdown.Toggle className="btn btn-default dropdown-toggle  filter-dropdown " variant="success" id="dropdown-basic">
                Filter by price
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item href={"?page=" + 1 + "&filter=price1&sort=" + sort}>$ 0 - 1000</Dropdown.Item>
                <Dropdown.Item href={"?page=" + 1 + "&filter=price2&sort=" + sort}>$ 1000 - 2000</Dropdown.Item>
                <Dropdown.Item href={"?page=" + 1 + "&filter=price3&sort=" + sort}>$ 2000 +</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="filter-column">
          <div className="dropdown pr-2">
            <Dropdown>
              <Dropdown.Toggle className="btn btn-default dropdown-toggle  filter-dropdown " variant="success" id="dropdown-basic">
                Filter by bedroom
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item href={"?page=" + 1 + "&filter=1&sort=" + sort}>1 Bed</Dropdown.Item>
                <Dropdown.Item href={"?page=" + 1 + "&filter=2&sort=" + sort}>2 Bed</Dropdown.Item>
                <Dropdown.Item href={"?page=" + 1 + "&filter=3&sort=" + sort}>3 Bed</Dropdown.Item>
                <Dropdown.Item href={"?page=" + 1 + "&filter=4&sort=" + sort}>4 Bed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="filter-column">
          <div className="dropdown pr-2">
            <Dropdown>
              <Dropdown.Toggle className="btn btn-default dropdown-toggle  filter-dropdown " variant="success" id="dropdown-basic">
                Filter by size
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item href={"?page=" + 1 + "&filter=size1&sort=" + sort}>$ 0 - 1000</Dropdown.Item>
                <Dropdown.Item href={"?page=" + 1 + "&filter=size2&sort=" + sort}>$ 1000 - 2000</Dropdown.Item>
                <Dropdown.Item href={"?page=" + 1 + "&filter=size3&sort=" + sort}>$ 2000 +</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="filter-column">
          <div className="dropdown pr-2">
            <Dropdown>
              <Dropdown.Toggle className="btn btn-default dropdown-toggle  filter-dropdown " variant="success" id="dropdown-basic">
                Sort by price
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item href={"?page=" + 1 + "&filter=" + filter + "&sort=priceUp"}>Low to High</Dropdown.Item>
                <Dropdown.Item href={"?page=" + 1 + "&filter=" + filter + "&sort=priceDown"}>High to Low</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="filter-column-reset">
          <a href="/properties?page=1" className="a-btn">
            <button className="btn btn-default filter-dropdown ">
              Reset
            </button>
          </a>
        </div>
      </div>
      {div}
      {pagination}
    </main>
  );
};

export default Property;
