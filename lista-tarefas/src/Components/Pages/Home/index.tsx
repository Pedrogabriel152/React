import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Firebase
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

// CSS
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState<any>({});

  const navigate = useNavigate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!user.email || !user.password) {
      alert("Preença todos os campos");
    }

    await signInWithEmailAndPassword(auth, user.email, user.password)
    .then((value: any) => {
      navigate('admin', { replace: true })
    })
    .catch((erro: any) => console.log("Erro ao fazer login"))
  }

  return (
    <div className='home-container'>
      <h1>Lista de Tarefas</h1>      
      <span>Gerencie sua agenda de forma fácil.</span>

      <form onSubmit={handleOnSubmit} className='form'>
        <input 
          type="email" 
          placeholder='Digite seu e-mail...'
          name='email'
          value={user.email? user.email : ''}
          onChange={handleOnChange}
        />

        <input 
          type="password" 
          placeholder='Digite uma senha'
          name='password'
          value={user.password? user.password : ''}
          onChange={handleOnChange}
        />

        <button type="submit">Acessar</button>
      </form>

      <p className='button-link'>Não possui uma conta? <Link to={'/register'}>Clique aqui</Link></p>
    </div>
  );
}

export default Home;