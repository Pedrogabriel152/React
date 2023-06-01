import alimentacao from '../assets/images/alimentacao.svg';
import outros from '../assets/images/outros.svg';
import saude from '../assets/images/saude.svg';
import transporte from '../assets/images/transporte.svg';
import utilidades from '../assets/images/utilidades.svg';
import { ImagemIcone } from '../Components/UI';

export const imageFilter = (type) => {
    const Images = {
        Restaurante: <ImagemIcone src={alimentacao} alt='Restaurante'/>,
        Saude: <ImagemIcone src={saude} alt='Saude'/>,
        Transporte: <ImagemIcone src={transporte} alt='Transporte'/>,
        Utilidades: <ImagemIcone src={utilidades} alt='Utilidades'/>,
        default: <ImagemIcone src={outros} alt='Outros'/>
    };

    return Images[type] || Images.default;
}