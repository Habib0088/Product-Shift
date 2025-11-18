import React from 'react';
import Banner from '../Banner/Banner';
import Delivery from '../Delivery/Delivery';
import Service from '../Service/Service';
import Brand from '../Brand/Brand';
import Review from '../Review/Review';
import ParcelDelivary from '../ParcelDalervary/ParcelDelivary';
const serviceResponse=fetch("/services.json").then(res=>res.json())
const revierResponse=fetch("/reviews.json").then(res=>res.json())
const Home = () => {

    
    
    return (
        <div>
            <Banner></Banner>
            <Delivery></Delivery>
            
            <Service serviceResponse={serviceResponse}></Service>
            
            <Brand></Brand>
            <ParcelDelivary></ParcelDelivary>
            <Review revierResponse={revierResponse}></Review>
        </div>
    );
};

export default Home;