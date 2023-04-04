import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Firebase
import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// CSS
import './Register.css';

const Register = () => {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!user.email || !user.password) {
      alert("Preença todos os campos")
      return
    }

    await createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(() => {
      navigate('/admin', {replace: true})
    })
    .catch(() => console.log("Deu erro"))
  }

  return (
    <div className='home-container'>
      <h1>Cadastre-se</h1>      
      <span>Vamos criar sua conta.</span>

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

        <button type="submit">Cadastrar</button>
      </form>

      <p className='button-link'>Já possui uma conta? <Link to={'/'}>Clique aqui</Link></p>
    </div>
  );
}

export default Register;