import React, { useContext } from "react";

// Context 
import { AuthContext } from "../../../Contexts/auth";
import Header from "../../Layouts/Header";

const Dashboard = () => {
    const { logout }: any = useContext(AuthContext);
    return (
        <div>
            <Header/>
            <h1>Dash</h1>
            <button onClick={logout}>Sair da conta</button>
        </div>
    );
}

export default Dashboard;