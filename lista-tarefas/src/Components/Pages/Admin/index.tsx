import React, { ChangeEvent, FormEvent, useState } from "react";

// CSS
import "./Admin.css";

// Firebase
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";

const Admin = () => {

    const [tarefa, setTarefa] = useState<string>('')

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        
    }

    const handlLogout = async () => {
        await signOut(auth);
    }

    return(
        <div className="adimin-container">
            <h1>Minhas tarefas</h1>

            <form onSubmit={handleOnSubmit} className="form">
                <textarea 
                    name="tarefa" 
                    placeholder="Digite sua tarefa" 
                    value={tarefa}
                    onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setTarefa(e.target.value)}
                />

                <button className="btn-register" type="submit">Registrar tarefa</button>
            </form>

            <article className="list">
                <p>Estudar JavaScript hj</p>

                <div>
                    <button>Editar</button>
                    <button className="btn-delete">Concluir</button>
                </div>
            </article>

            <button className="btn-logout" onClick={handlLogout}>Sair</button>
        </div>
    );
}

export default Admin;