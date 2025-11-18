import React from 'react';
import Banner from '../Banner/Banner';
import Delivery from '../Delivery/Delivery';
import Service from '../Service/Service';
const serviceResponse=fetch("/services.json").then(res=>res.json())
const Home = () => {

    
    
    return (
        <div>
            <Banner></Banner>
            <Delivery></Delivery>
            <Service serviceResponse={serviceResponse}></Service>
        </div>
    );
};

export default Home;