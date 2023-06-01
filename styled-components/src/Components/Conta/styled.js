import styled from "styled-components";
import { ImagemIcone } from "../UI";
import { corPrimaria } from "../UI/variaveis"

export const ImagemIconeMargin = styled(ImagemIcone)`
    margin-top: 2px;
`;

export const Saldo = styled.div`
    font-weight: 700;
    font-size: 32px;

    span {
        color: ${corPrimaria};
        font-size: 24px;
    }
`;