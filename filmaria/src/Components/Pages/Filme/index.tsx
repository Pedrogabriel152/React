import React, {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';

// API
import api from "../../../utils/api";

// CSS
import styles from "./Filme.module.css";

const Filme = () => {
    const { id } = useParams();
    const [filme, setFilme] = useState<any>();

    useEffect(() => {
        api.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-br`)
        .then(res => {
            setFilme(res.data)
            console.log(res.data)
        }) 
    },[id]);


    return (
        <div className={styles.filme}>
           {filme && (
                <>
                    <h1>{filme.title}</h1>
                    <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                    <h2>Sinopse:</h2>
                    <h3>{filme.overview}</h3>
                    <div className={styles.infos}>
                        <div className={styles.info}>
                            <p><span>Duração:</span> {filme.runtime} minutos</p>
                            <p><span>Lançamento:</span> {new Date(filme.release_date).toLocaleDateString('pt-BR')}</p>
                            <p><span>Classificação:</span> {filme.vote_average}</p>
                        </div>
                        <div>
                            <h4>Estúdios:</h4>
                            <div className={styles.images}>
                            {filme.production_companies.map((studio: any) => (
                                <img key={studio.id} src={`https://image.tmdb.org/t/p/original/${studio.logo_path}`} alt={studio.name} />
                            ))}
                            </div>
                        </div>
                    </div>
                    <Link to={'/'} className={styles.link}>Voltar</Link>
                </>
           )}
        </div>
    );
}

export default Filme;
