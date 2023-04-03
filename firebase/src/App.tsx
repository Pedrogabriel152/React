import React, { useState } from 'react';
import { db } from './firebase';
import { doc, setDoc, collection, addDoc, getDoc } from "firebase/firestore";
import './app.css';

function App() {

  const [titulo, setTitulo] = useState<string>('');
  const [autor, setAutor] = useState<string>('');

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
      const postRef = doc(db, "posts", "B6rTiuIsYlLx6PdIij6x")

      await getDoc(postRef)
      .then((res: any) => {
        setAutor(res.data().autor)
        setTitulo(res.data().titulo)
      })
  }

  const handleOnChange = (e: any) => {
    if(e.target.name == "title") {
      setTitulo(e.target.value)
    } else {
      setAutor(e.target.value)
    }
  }

  return (
    <div className="App">
      <h1>ReactJS + Firebase</h1>
      <div className="container">
        <label htmlFor="title">Titulo</label>
        <textarea name="title" 
                  id="title" 
                  placeholder='Digite um título' 
                  value={titulo}
                  onChange={handleOnChange}
        />

        <label htmlFor="autor">Titulo</label>
        <input type="text" 
                  name="autor" 
                  id="autor" 
                  placeholder='Digite um autor' 
                  value={autor}
                  onChange={handleOnChange}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={handleGet}>Buscar</button>
      </div>
     
    </div>
  );
}

export default App;
