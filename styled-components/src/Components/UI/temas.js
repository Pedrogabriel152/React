import {
    fundoClaro, 
    fundoEscuro,
    conteudoEscuro, 
    conteudoClaro, 
    textoFundoClaro, 
    textoFundoEscuro
} from './variaveis';

export const temaClaro = {
    body: fundoClaro,
    inside: conteudoClaro,
    text: textoFundoClaro,
    filter: ''
}

export const temaEscuro = {
    body: fundoEscuro,
    inside: conteudoEscuro,
    text: textoFundoEscuro,
    filter: "invert(100%)"
}