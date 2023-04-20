import React from "react";

interface Props {
    type: string
    name: string
    placeholder: string
    value: any
    handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void
    checked?: boolean
    data_teste?: string
}

const Input = ({type, name, placeholder, value, handleOnChange, checked, data_teste}: Props) => {
    return (
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={handleOnChange}
            checked= {checked? checked : false}
            data-test={data_teste? data_teste : ''}
        />
    );
}

export default Input;