import React from "react";
import bank_logo from "../../assets/images/bank_logo.svg";
import { Cabecalho as Header} from "./styled";

const Cabecalho = () => {
  return (
    <Header>
      <img className="imagem-logo" src={bank_logo} alt="Logo Smart Bank" />
      <div>
        <a className="btn-secundario" href="https://google.com">
          Ajuda
        </a>
        <a className="btn-primario" href="https://google.com">
          Sair
        </a>
      </div>
    </Header>
  );
};

export default Cabecalho;
