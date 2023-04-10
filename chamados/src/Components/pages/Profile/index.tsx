import React, { useContext, useState } from "react";

// CSS
import './Profile.css';

// Layouts
import Header from "../../Layouts/Header";
import Title from "../../Layouts/Title";

// Icons
import { FiSettings, FiUpload } from "react-icons/fi";

// Imagem
import avatar from '../../../assets/avatar.png';

// Context
import { AuthContext } from "../../../Contexts/auth";

const Profile = () => {
    const { user } = useContext<any>(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState<any>(user && user.avatarUrl)

    return (
        <div>
            <Header />
            <div className="content">
                <Title name='Minha conta'> 
                    <FiSettings size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile">

                        <label className="label-avatar">
                            <label>
                                <FiUpload color="#FFF" size={25}/>
                            </label>

                            <input type="file" accept="image/*" /><br />
                            {avatarUrl
                                ? <img src={avatarUrl} alt="Foto de perfil" width={250} height={250}/>
                                : <img src={avatar} alt="Foto de perfil" width={250} height={250}/>
                            }

                        </label>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;