import React from "react";

interface Props {
    type: string
    name: string
    placeholder: string
    value: any
    handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void
    checked?: boolean
}

const Input = ({type, name, placeholder, value, handleOnChange, checked}: Props) => {
    return (
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={handleOnChange}
            checked= {checked? checked : false}
        />
    );
}

export default Input;