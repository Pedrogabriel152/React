import React from "react";
import { Titulo as Title } from "./styled";

const Titulo = ({ children }) => {
  return <Title className="titulo">{children}</Title>;
};
export default Titulo;
