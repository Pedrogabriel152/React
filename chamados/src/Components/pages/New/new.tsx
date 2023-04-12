import React from "react";

// CSS
import './New.css';

// Layouts
import Header from "../../Layouts/Header";
import Title from "../../Layouts/Title";
import Input from "../../Form/Input";

// Icons
import { FiPlusCircle } from "react-icons/fi";

const New = () => {

    const handleOnChange = () => {

    }

    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label htmlFor="client">Cliente:</label>
                        <select name="client" id="client">
                            <option key={1} value="1">Mercado Teste</option>
                            <option key={2} value="2">Loja Informatica</option>
                        </select>

                        <label htmlFor="assunto">Assunto:</label>
                        <select name="assunto" id="assunto">
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Finaceiro">Finaceiro</option>
                        </select>

                        <label>Status:</label>
                        <div className="status">
                            <Input 
                                type="radio"
                                name="radio"
                                value={"Aberto"}
                                placeholder=""
                                handleOnChange={handleOnChange}
                            />
                            <span>Em Aberto</span>

                            <Input 
                                type="radio"
                                name="radio"
                                value={"Progresso"}
                                placeholder=""
                                handleOnChange={handleOnChange}
                            />
                            <span>Progresso</span>

                            <Input 
                                type="radio"
                                name="radio"
                                value={"Atendido"}
                                placeholder=""
                                handleOnChange={handleOnChange}
                            />
                            <span>Atendido</span>
                        </div>

                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default New;