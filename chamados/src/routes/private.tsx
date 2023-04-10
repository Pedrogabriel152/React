import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Services/firebase";

// Context
import { AuthContext } from "../Contexts/auth";

const Private = ({children}: any) => {
    const { signed, loading }: any = useContext(AuthContext);

    if(loading){
        return <div></div>
    }

    if(!signed) {
        return <Navigate to={"/"} />
    }
    
    return children;
}

export default Private;