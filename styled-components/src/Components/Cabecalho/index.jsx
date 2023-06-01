import React from "react";
import bank_logo from "../../assets/images/bank_logo.svg";
import { Cabecalho as Header, ImagemLogo, BtnCabecalho} from "./styled";

const Cabecalho = () => {
  return (
    <Header>
      <ImagemLogo src={bank_logo} alt="Logo Smart Bank" />
      <div>
        <BtnCabecalho primary href="https://google.com">
          Ajuda
        </BtnCabecalho>
        <BtnCabecalho href="https://google.com">
          Sair
        </BtnCabecalho>
      </div>
    </Header>
  );
};

export default Cabecalho;
