import React, { useState } from 'react';
import useAuth from '../../../hook/useAuth';

const MyParcel = () => {
    const {user}=useAuth();
    const [data,setData]=useState([]);
   fetch(`http://localhost:3000/parcels?email=${user?.email}`).then(res=>res.json()).then(data=>{
    setData(data); 
   })
    return (
        <div>
            <h1>This is my percel{data.length}</h1>
        </div>
    );
};


export default MyParcel;