import React, { useContext } from "react";
import { Link } from "react-router-dom";

// CSS
import './Header.css';

// Avatar
import avatarimg from '../../../assets/avatar.png';

// Context
import { AuthContext } from "../../../Contexts/auth";

// Icons
import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const Header = () => {
    const { user, logout }: any = useContext(AuthContext)

    return(
        <div className="sidebar">
            <div><img src={user.avatarUrl? user.avatarUrl : avatarimg} alt="Foto do usuário" /></div>

            <Link to={'/dashboard'}>
                <FiHome color="#FFF" size={24} />
                Chamados
            </Link>
            <Link to={'/customers'}>
                <FiUser color="#FFF" size={24} />
                Clientes
            </Link>
            <Link to={'/profile'}>
                <FiSettings color="#FFF" size={24} />
                Perfil
            </Link>

            <Link to={''} onClick={logout}>
                <FiLogOut color="#FFF" size={24} />
                Sair
            </Link>
            
        </div>
    );
}

export default Header;