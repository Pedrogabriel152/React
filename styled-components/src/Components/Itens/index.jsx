import Item from '../Item';
import { Items } from './styled';
import { imageFilter } from '../ImageFillter';

const Itens = (props) => {
    return (
        <Items >
            {imageFilter(props.type)}
            <Item {...props}/>
            <span>{props.date}</span>
        </Items>
    );
}

export default Itens;