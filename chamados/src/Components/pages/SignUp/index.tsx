import React, { FormEvent, useState, useContext } from "react";
import { Link } from "react-router-dom";

// CSS 
import "../SignIn/SignIn.css";

// Context
import { AuthContext } from "../../../Contexts/auth";

// Logo
import logo from "../../../assets/logo.png";
import Input from "../../Form/Input";

const SignUp = () =>{

  const [user, setUser] = useState<any>({});
  const { signUp, loadingAuth } = useContext<any>(AuthContext);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!user.name) {
      alert("O nome é obrigatório");
      return;
    }

    if(!user.email) {
      alert("O e-mail é obrigatório");
      return;
    }

    if(!user.password) {
      alert("A senha é obrigatória");
      return;
    }

    await signUp(user.name, user.email, user.password)

  }

  return(
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />
        </div>

        <form onSubmit={handleSubmit}>
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

          <button type="submit">
            {loadingAuth
              ? 'Carregando...'
              : 'Cadastrar'
            }
          </button>
        </form>

        <Link to={'/'}>Faça o login</Link>
      </div>
    </div>
  )
}

export default  SignUp;