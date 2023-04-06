import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

// CSS 
import "./SignIn.css";

// Logo
import logo from "../../../assets/logo.png";
import Input from "../../Form/Input";

const SignIn = () =>{
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
          <h1>Entrar</h1>
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

        <Link to={'/register'}>Criar uma conta</Link>
      </div>
    </div>
  )
}

export default  SignIn;