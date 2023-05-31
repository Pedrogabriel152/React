import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Container, Form, SubmitButton } from './styles';
import { FaGithub, FaPlus } from 'react-icons/fa';
import api from '../../Services/apit';

const Main = () => {
    const [newRepo, setNewRepo] = useState<string>('');
    const [repositories, setRepositories] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewRepo(e.target.value)
    }

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        api.get(`repos/${newRepo}`)
        .then(res => {
            setRepositories([...repositories, res.data.full_name]);
            setNewRepo('')
            console.log(loading)
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
        console.log(loading)

    }, [newRepo, repositories])

    return(
        <Container>
            <h1><FaGithub size={25}/>Meus Repositorios</h1>

            <Form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Adicionar Repositorios'
                    value={newRepo}
                    onChange={handleInputChange}
                />
                <SubmitButton loading={loading? 1:0}>
                    <FaPlus color='#fff' size={14}/>
                </SubmitButton>
            </Form>
        </Container>
    );
}

export default Main;