import React, { useState, useEffect, useContext, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

// CSS
import './New.css';

// Layouts
import Header from "../../Layouts/Header";
import Title from "../../Layouts/Title";
import Input from "../../Form/Input";

// Icons
import { FiPlusCircle } from "react-icons/fi";

// Context 
import { AuthContext } from "../../../Contexts/auth";

// Firebase
import { db } from "../../../Services/firebase";
import { doc, collection, getDoc, getDocs, addDoc, updateDoc } from "firebase/firestore";

// Toastify
import { toast } from "react-toastify";

const New = () => {
    const [customers, setCustomers] = useState<Array<any>>([]);
    const [loadCustmuers, setLoadCustumers] = useState<boolean>(true);
    const [chamado, setChamado] = useState<any>({});
    const [custumerSelected, setCustomerSelected] = useState<any>(0);
    const { user } = useContext<any>(AuthContext);
    const { id } = useParams();
    const listRef = collection(db, "customers");
    const navigate = useNavigate();
    const [idCustomer, setIdCustomer] = useState<boolean>(false);

    useEffect(() => {
        chamado.status = 'Aberto'
        const querySnapshot = getDocs(listRef)
        .then((res: any) => {
            let lista: Array<any> = [];

            res.forEach((doc: any) => {
                lista.push({
                    id: doc.id,
                    nomeFantasia: doc.data().nomeFantasia
                });
            });

            if(res.docs.size === 0) {
                setLoadCustumers(false);
                setCustomers([{
                    id: 1, 
                    nomeFanatsia: 'FREELA'
                }]);
                return;
            }

            setCustomers(lista);
            setLoadCustumers(false);

            if(id) {
                loadId(lista);
            }
        })
        .catch((error : any) => {
            console.log("ERROR AO BUSCAR OS CLIENTES", error);
            setLoadCustumers(false);
            setCustomers([{
                id: 1, 
                nomeFanatsia: 'FREELA'
            }]);
        })
    }, [id]);

    const loadId = async (lista: any) => {
        if(id) {
            const docRef = doc(db, 'chamados', id);
            await getDoc(docRef)
            .then((snapshot: any) => {
                setChamado({
                    assunto: snapshot.data().assunto,
                    status: snapshot.data().status,
                    complemento: snapshot.data().complemento,
                });

                let index = lista.findIndex((item: any) => item.id === snapshot.data().clientId);
                setCustomerSelected(index);
                setIdCustomer(true);
            })
            .catch((error: any) => {
                console.log(error);
                setIdCustomer(false);
            })
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChamado({...chamado,[e.target.name]: e.target.value});
    }

    const handleChengeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCustomerSelected(e.target.value);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(idCustomer) {
            // Atualizando chamado
            const docRef = doc(db, 'chamados', id!);
            await updateDoc(docRef, {
                client: customers[custumerSelected].nomeFantasia,
                clientId: customers[custumerSelected].id,
                assunto: chamado.assunto? chamado.assunto : 'Suporte',
                complemento: chamado.complemento,
                status: chamado.status,
                uderId: user.uid
            })

            .then(() => {
                toast.info('Chamado atualizado com sucesso');
                setCustomerSelected(0);
                setChamado({});
                navigate('/dashboard');
            })
            .catch(() => toast.error('Erro ao atualizar este chamado, tente novamente mais tarde'))

            return;
        }

        // Registrar um chamado
        await addDoc(collection(db, "chamados"), {
            created: new Date(),
            client: customers[custumerSelected].nomeFantasia,
            clientId: customers[custumerSelected].id,
            assunto: chamado.assunto? chamado.assunto : 'Suporte',
            complemento: chamado.complemento,
            status: chamado.status,
            uderId: user.uid
        })
        .then(() => {
            toast.success('Chamado registrado');
            setChamado({});
            navigate('/dashboard')
            setCustomerSelected(0);
        })
        .catch((error: any) =>{
            toast.error('Erro ao registrar, tente novamente mais tarde!');
        })
    }

    const handleOnChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => setChamado({...chamado,[e.target.name]: e.target.value})

    return(
        <div>
            <Header />
            <div className="content">
                <Title name={id? 'Editando chamdo' : "Novo chamado"}>
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label htmlFor="client">Cliente:</label>
                        
                            {loadCustmuers 
                                ? <input type="text" disabled={true} value={"Carregando..."} />
                                : (
                                    <select name="client" id="client" value={custumerSelected} onChange={handleChengeSelect}> 
                                        {customers.map((item: any, index: any) => (
                                            <option key={index} value={index}>{item.nomeFantasia}</option>
                                        ))}
                                    </select>
                                )
                            }                        

                        <label htmlFor="assunto">Assunto:</label>
                        <select 
                            name="assunto" 
                            id="assunto" 
                            value={chamado.assunto} 
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setChamado({...chamado,[e.target.name]: e.target.value})}
                        >
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Finaceiro">Finaceiro</option>
                        </select>

                        <label>Status:</label>
                        <div className="status">
                            <Input 
                                type="radio"
                                name="status"
                                value={"Aberto"}
                                placeholder=""
                                handleOnChange={handleOnChange}
                                checked={chamado.status === 'Aberto'}
                            />
                            <span>Em Aberto</span>

                            <Input 
                                type="radio"
                                name="status"
                                value={"Progresso"}
                                placeholder=""
                                handleOnChange={handleOnChange}
                                checked={chamado.status === 'Progresso'}
                            />
                            <span>Progresso</span>

                            <Input 
                                type="radio"
                                name="status"
                                value={"Atendido"}
                                placeholder=""
                                handleOnChange={handleOnChange}
                                checked={chamado.status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>

                        <label htmlFor="complemento">Complemento:</label>
                        <textarea 
                            name="complemento"
                            placeholder="Descreva seu problema"
                            value={chamado.complemento}
                            onChange={handleOnChangeTextArea}
                        />

                        <button type="submit">{idCustomer ? 'Salvar' : 'Registrar'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default New;