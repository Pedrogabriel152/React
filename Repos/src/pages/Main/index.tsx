import { ChangeEvent, FormEvent, useCallback, useState, useEffect } from 'react';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../Services/api';

const Main = () => {
    const [newRepo, setNewRepo] = useState<string>('');
    const [repositories, setRepositories] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);

    // Buscar
    useEffect(() => {
        console.log('Começou')
        const repoStorage: any = localStorage.getItem('repos');
        console.log(repoStorage)
        console.log('Aquiiiiiiiiiiiiiiiiiiiiiiiiii')

        if(repoStorage){
            setRepositories(JSON.parse(repoStorage));
            console.log(repositories);
        }
    }, []);

    // Salvar alterações
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositories));
    }, [repositories]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewRepo(e.target.value);
        setAlert(false);
    }

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setAlert(false);

        if(!newRepo){
            console.log('Você precisa indicar um repositório');
            setAlert(true);
            setLoading(false);
            return;
        }
        
        api.get(`repos/${newRepo}`)
        .then(res => {
            const hasRepo = repositories.find((repo: any) => repo.full_name === newRepo);
            
            if(hasRepo){
                throw new Error('Você precisa indicar um repositorio!');
            }

            const data = {
                name: res.data.full_name
            }

            setRepositories([...repositories, data]);
            setNewRepo('')
            console.log(loading)
        })
        .catch(error => setAlert(true))
        .finally(() => setLoading(false));
        console.log(repositories)

    }, [newRepo, repositories]);

    const handleDelete = useCallback((name: string) => {
        const find = repositories.filter((r: any) => r.name !== name);
        setRepositories(find);
    },[repositories]);

    return(
        <Container>
            <h1><FaGithub size={25}/>Meus Repositorios</h1>

            <Form onSubmit={handleSubmit} error={alert}>
                <input 
                    type="text" 
                    placeholder='Adicionar Repositorios'
                    value={newRepo}
                    onChange={handleInputChange}
                />
                <SubmitButton loading={loading ? 1:0} >
                    {loading 
                        ? <FaSpinner color='#FFF' size={14}/> 
                        : <FaPlus color='#fff' size={14}/>
                    }
                </SubmitButton>
            </Form>

            <List>
                {repositories.map((repository: any) => (
                    <li key={repository.name}>
                        <span>
                            <DeleteButton onClick={()=>handleDelete(repository.name)}>
                                <FaTrash size={14}/>
                            </DeleteButton>
                            {repository.name}
                        </span>
                        <Link to={`/repositorio/${encodeURIComponent(repository.name)}`}>
                            <FaBars size={20}/>
                        </Link>
                    </li>
                ))} 
            </List>
        </Container>
    );
}

export default Main;