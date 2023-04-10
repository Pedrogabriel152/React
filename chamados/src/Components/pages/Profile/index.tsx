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
import Input from "../../Form/Input";

const Profile = () => {
    const { user, setUser, storageUser, logout } = useContext<any>(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState<any>(user && user.avatarUrl);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type=== 'image/png') {
                setAvatarUrl(URL.createObjectURL(image));
                setUser({...user,[user.avatarUrl]: avatarUrl})
            }
            else{
                alert("Mande uma imagem do tipo PNG ou JPEG");
                setAvatarUrl(null);
                return
            }
        }
    }

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
                            <span>
                                <FiUpload color="#FFF" size={25}/>
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /><br />
                            {avatarUrl
                                ? <img src={avatarUrl} alt="Foto de perfil" width={250} height={250}/>
                                : <img src={avatar} alt="Foto de perfil" width={250} height={250}/>
                            }

                        </label>

                        <label htmlFor="name">Nome:</label>
                        <Input 
                            type="text" 
                            name="name" 
                            placeholder="Seu nome" 
                            value={user? user.name : ''} 
                            handleOnChange={handleOnChange}
                        />

                        <label htmlFor="email">E-mail:</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Seu e-mail" 
                            value={user? user.email : ''}
                            disabled={true}
                        />

                        <button type="submit">Salvar</button>

                    </form>
                </div>

                <div className="container">
                    <button className="logout-btn" onClick={logout}>Sair</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;