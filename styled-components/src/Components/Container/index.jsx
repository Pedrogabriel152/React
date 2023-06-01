import React from "react";

import Titulo from "../Titulo";
import Conta from "../Conta";
import { StyledConatiner, Content } from "./styled";

const Container = () => {
  return (
    <StyledConatiner>
      <Titulo>Olá Fulano!</Titulo>
      <Content>
        <Conta />
      </Content>
    </StyledConatiner>
  );
};

export default Container;
