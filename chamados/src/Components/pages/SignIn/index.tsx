import React, { ChangeEvent, useState, useContext, FormEvent } from "react";
import { Link } from "react-router-dom";

// CSS 
import "./SignIn.css";

// Context
import { AuthContext } from "../../../Contexts/auth";

// Logo
import logo from "../../../assets/logo.png";
import Input from "../../Form/Input";

const SignIn = () =>{
  const [user, setUser] = useState<any>({});

  const { signIn, loadingAuth } = useContext<any>(AuthContext);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!user.email) {
      alert("O e-mail é obrigatório");
      return;
    }

    if(!user.password) {
      alert("A senha é obrigatória");
      return;
    }

    await signIn(user.email, user.password);

  }

  return(
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <Input 
            type='email'
            placeholder='E-mail'
            value={user.email? user.email : ''}
            name={'email'}
            handleOnChange={handleOnChange}
            data_teste='input-name'
          />
          <Input 
            type='password'
            placeholder='Senha'
            value={user.password? user.password : ''}
            name={'password'}
            handleOnChange={handleOnChange}
            data_teste='input-password'
          />

          <button type="submit" data-test='button-submit'>
            {loadingAuth 
              ? 'Carregando...'
              : 'Acessar'
            }
          </button>
        </form>

        <Link to={'/register'}>Criar uma conta</Link>
      </div>
    </div>
  )
}

export default  SignIn;