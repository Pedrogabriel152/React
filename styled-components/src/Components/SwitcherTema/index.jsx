import ThemeOn from "../../assets/images/themeOn.svg";
import ThemeOff from "../../assets/images/themeOff.svg";
import { ImagemIcone } from "../UI";

const claro = <ImagemIcone src={ThemeOn} alt="Tema Claro"/>;
const escuro = <ImagemIcone src={ThemeOff} alt="Tema Escuro"/>;

export default ({tema}) => (tema? escuro : claro);