import { ChangeEvent, FormEvent, useCallback, useState, useEffect } from 'react';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import api from '../../Services/apit';

const Main = () => {
    const [newRepo, setNewRepo] = useState<string>('');
    const [repositories, setRepositories] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);

    // Buscar
    useEffect(() => {
        const repoStorage = localStorage.getItem('repos');

        if(repoStorage){
            setRepositories(JSON.parse(repoStorage));
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

            setRepositories([...repositories, res.data]);
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
                    <li key={repository.id}>
                        <span>
                            <DeleteButton onClick={()=>handleDelete(repository.name)}>
                                <FaTrash size={14}/>
                            </DeleteButton>
                            {repository.name}
                        </span>
                        <a href="">
                            <FaBars size={20}/>
                        </a>
                    </li>
                ))} 
            </List>
        </Container>
    );
}

export default Main;