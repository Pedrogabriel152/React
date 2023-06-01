import { ItemStyled } from "./styled";

const Item = ({type, from, value}) => {
    return (
        <ItemStyled>
            <span className="text">{type}</span>
            <span>{from}</span>
            <span>{value}</span>
        </ItemStyled>
    );
}

export default Item;