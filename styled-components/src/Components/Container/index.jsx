import React from "react";

import Titulo from "../Titulo";
import Conta from "../Conta";
import { StyledConatiner, Content } from "./styled";
import Extrato from "../Extrato";

const Container = () => {
  return (
    <StyledConatiner>
      <Titulo>Olá Fulano!</Titulo>
      <Content>
        <Conta />
        <Extrato />
      </Content>
    </StyledConatiner>
  );
};

export default Container;
