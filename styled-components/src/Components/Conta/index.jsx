import React, { useState } from "react";

import privado from "../../assets/images/privado.svg";
import olho_icone from "../../assets/images/olho.svg";
import dinheiro from "../../assets/images/dinheiro.svg";
import { ImagemIcone, Box, Button } from "../UI";
import { ImagemIconeMargin, Saldo } from "./styled";

const Conta = () => {
  const [toggleState, untoggle] = useState(true);

  const toggleHandler = () => {
    untoggle((toggleState) => !toggleState);
  };

  return (
    <Box>
      <h2>Conta</h2>
      <div style={{ fontSize: "26px", padding: "20px 0" }}>
        Saldo disponível{" "}
        <span>
          <ImagemIcone src={dinheiro} alt="Ícone Saldo" />
        </span>
        {toggleState ? (
          <Saldo >
            <span>R$</span> 0,00{" "}
          </Saldo>
        ) : null}
      </div>

      <Button onClick={toggleHandler}>
        <ImagemIconeMargin
          src={toggleState ? privado : olho_icone}
          alt="Privacidade do Saldo"
        />
      </Button>
    </Box>
  );
};

export default Conta;
