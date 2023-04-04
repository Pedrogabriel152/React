import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

// CSS
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState<any>({});

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!user.email || !user.password) {
      alert("Preença todos os campos")
    }
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
          value={user.email}
          onChange={handleOnChange}
        />

        <input 
          autoComplete='false'
          type="password" 
          placeholder='Digite uma senha'
          name='password'
          value={user.password}
          onChange={handleOnChange}
        />

        <button type="submit">Acessar</button>
      </form>

      <p className='button-link'>Não possui uma conta? <Link to={'/register'}>Clique aqui</Link></p>
    </div>
  );
}

export default Home;