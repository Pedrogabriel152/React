import styled from 'styled-components';
import { fundoClaro } from '../UI/variaveis';

export const StyledConatiner = styled.div`
    background-color: ${fundoClaro};
    min-height: 90vh;
    padding: 0px 15vw;
`;

export const Content = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;