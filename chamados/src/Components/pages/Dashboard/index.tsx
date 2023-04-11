import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Context 
import { AuthContext } from "../../../Contexts/auth";

// Layouts
import Header from "../../Layouts/Header";
import Title from "../../Layouts/Title";

// CSS
import './Dashboard.css';

// Icons
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";

const Dashboard = () => {
    const { logout }: any = useContext(AuthContext);
    return (
        <div>
            <Header/>
            <div className="content">
                <Title name="Tickets"> 
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    <Link to={'/new'} className="new">
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
                            <tr>
                                <td data-label="Cliente">Mercado Esquina</td>
                                <td data-label="Assunto">Suport</td>
                                <td data-label="Status">
                                    <span className="badge" style={{backgroundColor: '#999'}}>
                                        Em Aberto
                                    </span>
                                </td>
                                <td data-label="Cadastrado">12/05/2023</td>
                                <td data-label="#">
                                    <button className="action" style={{backgroundColor: '#3583f6'}}>
                                        <FiSearch color="#FFF" size={17} />
                                    </button>

                                    <button className="action" style={{backgroundColor: '#f6a935'}}>
                                        <FiEdit2 color="#FFF" size={17} />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td data-label="Cliente">Informatica</td>
                                <td data-label="Assunto">Suport</td>
                                <td data-label="Status">
                                    <span className="badge" style={{backgroundColor: '#999'}}>
                                        Em Aberto
                                    </span>
                                </td>
                                <td data-label="Cadastrado">12/05/2023</td>
                                <td data-label="#">
                                    <button className="action" style={{backgroundColor: '#3583f6'}}>
                                        <FiSearch color="#FFF" size={17} />
                                    </button>

                                    <button className="action" style={{backgroundColor: '#f6a935'}}>
                                        <FiEdit2 color="#FFF" size={17} />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td data-label="Cliente">Informatica</td>
                                <td data-label="Assunto">Suport</td>
                                <td data-label="Status">
                                    <span className="badge" style={{backgroundColor: '#999'}}>
                                        Em Aberto
                                    </span>
                                </td>
                                <td data-label="Cadastrado">12/05/2023</td>
                                <td data-label="#">
                                    <button className="action" style={{backgroundColor: '#3583f6'}}>
                                        <FiSearch color="#FFF" size={17} />
                                    </button>

                                    <button className="action" style={{backgroundColor: '#f6a935'}}>
                                        <FiEdit2 color="#FFF" size={17} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            </div>
        </div>
    );
}

export default Dashboard;