import React, { useState } from "react";
import { Link } from "react-router-dom";

// CSS 
import "../SignIn/SignIn.css";

// Logo
import logo from "../../../assets/logo.png";
import Input from "../../Form/Input";

const SignUp = () =>{

  const [user, setUser] = useState<any>({});

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
  }
  return(
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />
        </div>

        <form>
          <h1>Registrar</h1>
          <Input 
            type='text'
            placeholder='Seu nome'
            value={user.name? user.name : ''}
            name={'name'}
            handleOnChange={handleOnChange}
          />
          <Input 
            type='email'
            placeholder='E-mail'
            value={user.email? user.email : ''}
            name={'email'}
            handleOnChange={handleOnChange}
          />
          <Input 
            type='password'
            placeholder='Senha'
            value={user.password? user.password : ''}
            name={'password'}
            handleOnChange={handleOnChange}
          />

          <button type="submit">Acessar</button>
        </form>

        <Link to={'/'}>Faça o login</Link>
      </div>
    </div>
  )
}

export default  SignUp;