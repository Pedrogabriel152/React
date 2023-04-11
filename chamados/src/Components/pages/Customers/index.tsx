import React, { FormEvent, useState } from "react";

// CSS
import './Customers.css';

// Layouts
import Header from "../../Layouts/Header";
import Title from "../../Layouts/Title";
import Input from "../../Form/Input";

// Icons 
import { FiUser } from 'react-icons/fi';

// Firebase
import { db } from "../../../Services/firebase";
import { addDoc, collection } from "firebase/firestore";

// Toastify
import { toast } from "react-toastify";

const Customers = () => {
    
    const [comapany, setComapany] = useState<any>({});

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComapany({...comapany, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!comapany.name) {
            toast.error("O nome é obrigatório");
            return;
        }

        if(!comapany.cnpj) {
            toast.error("O Endereço é obrigatório");
            return;
        }  

        if(!comapany.endereco) {
            toast.error("O CNPJ é obrigatório");
            return;
        }
    
        await addDoc(collection(db, "customers"), {
            nomeFantasia: comapany.name,
            cnpj: comapany.cnpj,
            endereco: comapany.endereco
        })
        .then(() => {
            setComapany({});
            toast.success("Empresa registrada com sucesso");
        })
        .catch((erro: any) => {
            console.log(erro);
            toast.error('Erro ao fazer o cadastro');
        })

    }
    
    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>

                        <label htmlFor="name">Nome Fantasia:</label>
                        <Input 
                            type="text" 
                            name="name" 
                            placeholder="Nome da empresa" 
                            value={comapany.name? comapany.name : ''} 
                            handleOnChange={handleOnChange}
                        />

                        <label htmlFor="email">CNPJ:</label>
                        <Input 
                            type="text" 
                            name="cnpj" 
                            placeholder="Digite o CNPJ" 
                            value={comapany.cnpj? comapany.cnpj : ''}
                            handleOnChange={handleOnChange}
                        />

                        <label htmlFor="email">Endereço da empresa:</label>
                        <Input 
                            type="text" 
                            name="endereco" 
                            placeholder="Digite o endereço da empresa" 
                            value={comapany.endereco? comapany.endereco: ''}
                            handleOnChange={handleOnChange}
                        />

                        <button type="submit">Salvar</button>

                    </form>
                </div>
            </div>

        </div>
    );
}

export default Customers;