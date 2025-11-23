import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hook/useAxiosSecure/useAxiosSecure';

const Payment = () => {
    const{id}=useParams();
    console.log(id);
    
    const axiosSecure=useAxiosSecure()
    

    const {data:parcel}=useQuery({
        queryKey:['parcel',id],
        queryFn: async()=>{
            const res=await axiosSecure(`/parcels/${id}`)
            console.log(res.data);
            
            return res.data;
        }
    })
    return (
        <div>
            <h1>{parcel?.name}</h1>
        </div>
    );
};

export default Payment;