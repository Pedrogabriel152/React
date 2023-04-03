import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { doc, 
        setDoc, 
        collection, 
        addDoc, 
        getDoc, 
        getDocs, 
        updateDoc, 
        deleteDoc,
        onSnapshot } from "firebase/firestore";

import { createUserWithEmailAndPassword,  } from "firebase/auth"
import './app.css';

function App() {

  const [titulo, setTitulo] = useState<string>('');
  const [autor, setAutor] = useState<string>('');
  const [posts, setPosts] = useState<any>([]);
  const [idpost, setIdPost] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {

    const unsub = onSnapshot(collection(db, "posts"), (res: any) => {
      let lista: Array<any> = [];

        res.forEach((doc: any) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        });

        setPosts(lista);
    })

  }, [posts])

  const handleAdd = async () => {
    // await setDoc(doc(db, 'posts', "12345"), {
    //   titulo: titulo,
    //   autor: autor
    // })
    // .then(() => {
    //   console.log("Dadeos salvos")
    // })
    // .catch((error: any) => {
    //   alert("Deu erro" + error)
    // })

    await addDoc(collection(db, 'posts'), {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log("Dados salvos")
    })
    .catch((error: any) => {
      alert("Deu erro" + error)
    })
  }

  const handleGet = async () => {
      // const postRef = doc(db, "posts", "S585Gx0ecEuC5KrW9Cd8")

      // await getDoc(postRef)
      // .then((res: any) => {
      //   setAutor(res.data().autor)
      //   setTitulo(res.data().titulo)
      // })

      const postRef = collection(db, "posts")

      await getDocs(postRef)
      .then((res:any) => {

        let lista: Array<any> = [];

        res.forEach((doc: any) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        });

        setPosts(lista);

      })
      .catch((error: any) => console.log("Deu erro"))
  }

  const handleOnChange = (e: any) => {
    if(e.target.name == "title") {
      setTitulo(e.target.value)
    } else if(e.target.name == "id") {
      setIdPost(e.target.value)
    }
    else {
      setAutor(e.target.value)
    }
  }

  const handleUpdate = async () => {
    const docRef = doc(db, "posts",idpost);

    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then((res: any) => {
      console.log("Atualizado com sucesso");
      setTitulo('');
      setAutor('');
      setIdPost('')
    })
    .catch((error:any) => console.log("Deu erro"))
  }

  const deletePost = async (id: string) => {
    const docRef = doc(db, "posts",id);

    await deleteDoc(docRef)
    .then(() => handleGet())
    .catch((erro: any) => console.error(erro)
    )
  }

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("Cadastrado com sucesso")
      setEmail('')
      setPassword('')
    })
    .catch((error: any) => console.log("Deu erro"))
  }

  return (
    <div className="App">
      <h1>ReactJS + Firebase</h1>
      <div className="container">
        <h2>Usuários</h2>
        <label htmlFor="email">E-mail</label>
        <input  type='email'
                name="email" 
                id="email" 
                placeholder='Digite seu E-mail' 
                value={email}
                onChange={(e: any) => setEmail(e.target.value) }
        />
        <label htmlFor="password">Senha</label>
        <input  type='password'
                name="password" 
                id="password" 
                placeholder='Digite uma senha' 
                value={password}
                onChange={(e: any) => setPassword(e.target.value) }
        />

        <button onClick={handleRegister}>Cadastrar</button>

        <br /> <br />
        
      </div>
      <hr />
      <div className="container">
        <h2>Posts</h2>
        <label htmlFor="id">ID do post</label>
        <input  type='text'
                name="id" 
                id="id" 
                placeholder='Digite o id do post' 
                value={idpost}
                onChange={handleOnChange}
        />
        <br />

        <label htmlFor="title">Titulo</label>
        <textarea name="title" 
                  id="title" 
                  placeholder='Digite um título' 
                  value={titulo}
                  onChange={handleOnChange}
        />

        <label htmlFor="autor">Autor</label>
        <input type="text" 
                  name="autor" 
                  id="autor" 
                  placeholder='Digite um autor' 
                  value={autor}
                  onChange={handleOnChange}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={handleGet}>Buscar</button>
        <br />

        <button onClick={handleUpdate}>Atualizar</button>

        <ul>
          {posts.map((post: any) => (
            <li key={post.id}>
              <span><strong>ID: {post.id}</strong></span> <br />
              <span>Titulo: {post.titulo}</span> <br />
              <span>Autor: {post.autor}</span> <br />
              <button onClick={() => deletePost(post.id)}>Excluir</button>
              <hr />
            </li>
          ))}
        </ul>
      </div>

     
    </div>
  );
}

export default App;
