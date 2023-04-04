import React, { useState, useEffect } from "react";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

const Private = ({children}: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [signed, setSigned] = useState<boolean>(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user: any) => {
            if(!user){
                setLoading(false);
                setSigned(false);
                return
            }

            const userData: object = {
                uid: user.uid,
                email: user.email
            }

            localStorage.setItem("@detailUser", JSON.stringify(userData));
            setLoading(false);
            setSigned(true);
        })
    }, [loading, signed])

    if(loading){
        return (
            <div></div>
        )
    }

    if(!signed){
        return <Navigate to={'/'}/>
    }
    
    return children;
}

export default Private;