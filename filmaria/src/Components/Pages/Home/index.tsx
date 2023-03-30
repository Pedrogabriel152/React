import React, {useState, useEffect} from "react";

// CSS
import styles from "./Home.module.css";

// API
import api from "../../../utils/api";
// 3/movie/550?api_key=49aa1e398a92e084a2b8d3f023a0c18a

const Home = () => {

    const [filmes, setFilmes] = useState<any>();

    useEffect(() => {
        api.get(`/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-br`)
        .then((res) => {
            setFilmes(res.data)
            console.log(res.data.results[0])
        })

    },[])

    return(
        <div>
            {filmes && (
                <section className={styles.home}>
                    {filmes.results.map((filme: any) => (
                        <div key={filme.id} className={styles.grid}>
                            <h1>{filme.title}</h1>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <button>Acessar</button>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}

export default Home;