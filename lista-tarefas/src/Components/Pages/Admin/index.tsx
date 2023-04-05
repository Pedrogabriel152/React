import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";

// CSS
import "./Admin.css";

// Firebase
import { auth, db } from "../../../firebase";
import { signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot, query, orderBy, where, deleteDoc, doc, updateDoc } from "firebase/firestore";

const Admin = () => {

    const [tarefa, setTarefa] = useState<string>('');
    const [user, setUser] = useState<any>({});
    const [tarefas, setTarefas] = useState<any>([]);
    const [edit, setEdit] = useState<any>({});

    useEffect(() => {
        const userDetail = localStorage.getItem('@detailUser');
        if(userDetail){
            const data = JSON.parse(userDetail);

            setUser(data);

            const tarefaRef = collection(db, "tarefas");
            const q = query(tarefaRef, orderBy("created", "desc"), where('userUid', '==', data?.uid));
            const unsub = onSnapshot(q, (snapshot: any) => {
                let lista: Array<any> = [];

                snapshot.forEach((doc: any) => {
                    lista.push({
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        userUid: doc.data().userUid
                    })
                })

                setTarefas(lista);
            })

        }
    },[])

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(!tarefa) {
            alert("Digite sua tarefa");
            return;
        }

        if(edit?.id) {
            handleUpdate();
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefa,
            created: new Date(),
            userUid: user?.uid
        })
        .then(() => {
            console.log("Tarefa Registrada");
            setTarefa('');
        })
        .catch((error: any) => {
            console.log(`Erro ao registrar ${error}`);
        })
    }

    const handlLogout = async () => {
        await signOut(auth);
    }

    const deleteTask = async (id: string) => {
        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef)
        .then(() => console.log("tarefa concluida"))
        .catch(() => console.log("Deu erro"))
    }

    const editTask = (tarefa: any) => {
        setTarefa(tarefa.tarefa)
        setEdit(tarefa)
    }

    const handleUpdate = async () => {
        const docRef = doc(db, "tarefas", edit?.id);
        await updateDoc(docRef, {
            tarefa: tarefa
        })
        .then(() => {
            console.log("tarefa atulizada");
            setTarefa('');
            setEdit({});
        })
        .catch(() => {
            console.log("Deu Erro");
            setTarefa('');
            setEdit({});
        })
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

                {Object.keys(edit).length > 0
                ? (<button className="btn-register" type="submit">Atualizar tarefa</button>) 
                : (<button className="btn-register" type="submit">Registrar tarefa</button>)
                }
            </form>

            {tarefas.map((tarefa: any) => (
                    <article className="list" key={tarefa.id}>
                        <p>{tarefa.tarefa}</p>
        
                        <div>
                            <button onClick={() => editTask(tarefa)}>Editar</button>
                            <button className="btn-delete" onClick={() => deleteTask(tarefa.id)}>Concluir</button>
                        </div>
                    </article>
            ))}

            <button className="btn-logout" onClick={handlLogout}>Sair</button>
        </div>
    );
}

export default Admin;