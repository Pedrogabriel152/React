import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Container, Form, SubmitButton } from './styles';
import { FaGithub, FaPlus } from 'react-icons/fa';
import api from '../../Services/apit';

const Main = () => {
    const [newRepo, setNewRepo] = useState<string>('');
    const [repositorios, setRepositorios] = useState<any>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewRepo(e.target.value)
    }

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        api.get(`repos/${newRepo}`)
        .then(res => {
            setRepositorios([...repositorios, res.data.full_name]);
            setNewRepo('')
        })
        .catch(error => console.log('Repositorio não encontrado'));
        console.log(repositorios)
        
    }, [newRepo, repositorios])

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
                <SubmitButton>
                    <FaPlus color='#fff' size={14}/>
                </SubmitButton>
            </Form>
        </Container>
    );
}

export default Main;