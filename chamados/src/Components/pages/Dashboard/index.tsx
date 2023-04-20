import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

// Context 
import { AuthContext } from "../../../Contexts/auth";

// Layouts
import Header from "../../Layouts/Header";
import Title from "../../Layouts/Title";
import Modal from "../../Layouts/Modal";

// CSS
import './Dashboard.css';

// Icons
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";

// Firebase
import { getDocs, orderBy, limit, startAfter, collection, query, getDoc, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "../../../Services/firebase";

const listRef = collection(db, 'chamados');

const Dashboard = () => {
    const [chamados, setChamados] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [lastDocs, setLastDocs] = useState<any>();
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [showPostModal, setShowPostModal] = useState<boolean>(false);
    const [detail, setDetail] = useState<any>({});

    useEffect(() => {
        async function loadChamados() {
            const q = query(listRef, orderBy('created', 'desc'), limit(5));
            const querySnapshot = await getDocs(q);
            setChamados([]);
            await updateState(querySnapshot);

            setLoading(false);
        }

        loadChamados();
        

        return () => { }
    }, []);

    const updateState = async (querySnapshot: QuerySnapshot<DocumentData>) => {
        const isCollectionEmpty = querySnapshot.size === 0;

        if(!isCollectionEmpty) {
            let lista: any = [];
            querySnapshot.forEach((doc: any) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    client: doc.data().client,
                    clientId: doc.data().clientId,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento,
                })
            });
            
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]; // Pegando o ultimo item

            setChamados((chamados: any) => [...chamados, ...lista]);
            setLastDocs(lastDoc);
            
        } else{
            setIsEmpty(true)
        }

        setLoadingMore(false); 
        
    }

    const handleMore = async () => {
        setLoadingMore(true);

        const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(5));
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);
    }

    const toggleModal = (item: any) => {
        setShowPostModal(!showPostModal);
        setDetail(item);
    }

    if(loading) {
        return (
            <div>
                <Header />

                <div className="content">
                    <Link to={'/new'} className="new">
                        <FiPlus color="#FFF" size={25} />
                        Novo chamado
                    </Link>

                    <div className="container dashboard">
                        <span>Buscando chamados...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header/>
            <div className="content">
                <Title name="Tickets"> 
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    {!chamados
                        ? (
                            <div className="container dashboard">
                                <span>Nenhum chamado encontrado...</span>

                                <Link to={'/new'} className="new" data-test='novo-chamado'>
                                    <FiPlus color="#FFF" size={25} />
                                    Novo chamado
                                </Link>
                            </div>
                        )
                        : (
                            <>
                                <Link to={'/new'} className="new" data-test='novo-chamado-dados'>
                                    <FiPlus color="#FFF" size={25} />
                                    Novo chamado
                                </Link>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Assunto</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Cadastrado em</th>
                                            <th scope="col">#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chamados.map((item: any, index: number) => (
                                            <tr key={index}>
                                                <td data-label="Cliente">{item.client}</td>
                                                <td data-label="Assunto">{item.assunto}</td>
                                                <td data-label="Status">
                                                    <span className="badge" style={{backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999'}}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td data-label="Cadastrado">{item.createdFormat}</td>
                                                <td data-label="#">
                                                    <button className="action" style={{backgroundColor: '#3583f6'}} onClick={() => toggleModal(item)}>
                                                        <FiSearch color="#FFF" size={17} />
                                                    </button>

                                                    <Link className="action" style={{backgroundColor: '#f6a935'}} to={`/new/${item.id}`}>
                                                        <FiEdit2 color="#FFF" size={17} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                </table>

                                {loadingMore && <h3>Buscando mais chamados...</h3>}
                                {!loadingMore && !isEmpty && <button onClick={handleMore} className="btn-more">Buscar mais</button>}
                            </>
                        )
                    }

                </>
            </div>
            {showPostModal && <Modal conteudo={detail} close={() => setShowPostModal(!showPostModal)} />}
        </div>
    );
}

export default Dashboard;