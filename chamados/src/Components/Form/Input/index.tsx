import React from "react";

interface Props {
    type: string
    name: string
    placeholder: string
    value: any
    handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const Input = ({type, name, placeholder, value, handleOnChange}: Props) => {
    return (
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={handleOnChange}
        />
    );
}

export default Input;