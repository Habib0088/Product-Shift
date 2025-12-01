import React from 'react';
import useRole from '../hook/useRole';
import Restriction from '../Component/Restriction/Restriction';

const AdminRoute = ({children}) => {
    const {role}=useRole()
    if(role!== 'admin'){
        return <Restriction></Restriction>
    }
    return children
};

export default AdminRoute;