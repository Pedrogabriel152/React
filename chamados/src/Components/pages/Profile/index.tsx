import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// CSS
import './Profile.css';

// Toatfy
import { toast } from 'react-toastify';

// Layouts
import Header from "../../Layouts/Header";
import Title from "../../Layouts/Title";
import Input from "../../Form/Input";

// Icons
import { FiSettings, FiUpload } from "react-icons/fi";

// Imagem
import avatar from '../../../assets/avatar.png';

// Context
import { AuthContext } from "../../../Contexts/auth";

// Firebase
import { doc, updateDoc } from "firebase/firestore";
import { storage, db } from "../../../Services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = () => {
    const { user, setUser, storageUser, logout } = useContext<any>(AuthContext);
    const navigate = useNavigate();
    const [avatarUrl, setAvatarUrl] = useState<any>(user && user.avatarUrl);
    const [image, setImage] = useState<any>(null);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type=== 'image/png') {
                setAvatarUrl(URL.createObjectURL(image));
                setImage(image);
            }
            else{
                alert("Mande uma imagem do tipo PNG ou JPEG");
                setAvatarUrl(null);
                setImage(null);
                return;
            }
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!avatarUrl && user.name) {
            // Atualizar somente o nome
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                name: user.name
            })
            .then(() => {
                storageUser(user);
                toast.success('Atualizado com sucesso');
            })
            .catch( (error: any) => {
                console.log(error);
                toast.error('Algo deu errado, tente novamente mais tarde!');
            });

            return;

        } else if(avatarUrl && user.name){
            // Atualizar foto e nome
            await handleUpload();
        }
    }

    const handleUpload = async () => {
        const uid = user.uid;

        const uploadRef = ref(storage, `images/${uid}/${image.name}`);

        const uploadTask = await uploadBytes(uploadRef, image)
        .then((res: any) => {
            getDownloadURL(res.ref).then( async (url: any) => {
                let urlFoto = url;

                const docRef = doc(db, "users", user.uid);

                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    name: user.name
                })
                .then(() => {
                    user.avatarUrl = urlFoto;
                    console.log(user)
                    storageUser(user);
                    toast.success('Atualizado com sucesso');
                    navigate('/profile');
                })
            })
        })
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name='Minha conta'> 
                    <FiSettings size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>

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