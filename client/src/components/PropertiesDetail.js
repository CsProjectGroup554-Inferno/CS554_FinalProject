import React, { useState, useEffect, useContext, useRef } from 'react';
import serverRequest from '../serverRequest'
import { Link } from 'react-router-dom';
// import { AuthorizeContext } from "../Authorization/Authorize";
// import { useAlert } from 'react-alert'
// import { Helmet } from 'react-helmet-async'
// import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Carousel } from 'react-responsive-carousel';
import { BiBed, BiUserCircle } from 'react-icons/bi';
import { GiBathtub } from 'react-icons/gi';
import { BsCurrencyDollar } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { MdLocationCity, MdMyLocation } from 'react-icons/md'

const PropertiesDetail = (props) => {
    const [propertyData, setPropertyData] = useState([]);
    const [ /*isWatchlist,*/ setIsWatchlist] = useState();
    const [loading, setLoading] = useState(true);
    // const { currentUser } = useContext(AuthorizeContext);
    // const alert = useRef(useAlert());
    var id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(
        () => {
            async function fetchData() {
                try {
                    setLoading(true);
                    const property = await serverRequest.getPropertyById(id)
                    console.log(property)
                    resPropertyData = property;
                    setPropertyData(property);
                    setLoading(false);
                } catch (e) {
                    setLoading(false);
                    // alert.current.error(e.message)
                }
            }
            let resPropertyData = null
            fetchData();
        },
        [props/*, currentUser*/]
    );

    const div = (property) => {
        return (
            property.images.map((item, index) => (
                <div key={index} >
                    <img src={item} />
                </div>
            ))
        );
    };

    const li = (property) => {
        let price, zipcode, address, city, bedrooms, bathrooms, owner, phone;
        if (property.price) {
            price = (
                <>
                    <BsCurrencyDollar />
                    {property.price}
                </>)
        }
        if (property.address) {
            address = (
                <>
                    <MdMyLocation />
                    {property.address}
                </>)
        }
        if (property.city) {
            city = (
                <>
                    <MdLocationCity />
                    {property.city}
                </>)
        }
        if (property.zipcode) {
            zipcode = (
                <>
                    <GoLocation />
                    {property.zipcode}
                </>)
        }
        if (property.bedrooms) {
            bedrooms = (
                <>
                    <BiBed />
                    {property.bedrooms}
                </>)
        }
        if (property.bathrooms) {
            bathrooms = (
                <>
                    <GiBathtub />
                    {property.bathrooms}
                </>)
        }
        if (property.owner._id && property.owner.email) {
            owner = (
                <>
                    <BiUserCircle />
                    <Link to={"/user/" + property.owner._id}>{property.owner.email}</Link>
                </>)
        }

        return (
            <>
                {price || bedrooms || bathrooms ? (
                    <div className="icon-group">
                        <p>{price} &nbsp;&nbsp;{bedrooms}&nbsp;&nbsp; {bathrooms}</p>
                    </div>
                ) : null
                }

                <div className="icon-group">
                    <p>{address}</p>
                </div>
                <div className="icon-group">
                    <p>{city}</p>
                </div>
                <div className="icon-group">
                    <p>{zipcode}</p>
                </div>
                <div className="icon-group">
                    <p>{owner}</p>
                </div>
            </>
        )
    }

    if (loading) {
        return (
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        )
    }



    return (
        <main>
            <section className='property-detail-title'>
                <h1>{propertyData.title}</h1>
                <div className='row'>
                    <div className='column carousal'>
                        <Carousel >
                            {div(propertyData)}
                        </Carousel>
                    </div>
                    <div className='column detail-data'>
                        {li(propertyData)}
                    </div>
                </div>
                <div className='my-3 description'>
					<h2>Description</h2>
					<p>{(propertyData && propertyData.description) || 'Not Provided'}</p>
				</div>
            </section>
        </main>
    );
};

export default PropertiesDetail;
