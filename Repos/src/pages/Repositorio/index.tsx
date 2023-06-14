import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Owner, Loaging, BackButton, IssuesList, PageActions, Filter } from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../Services/api";

const Repositorio = () => {
    const { repositorio } = useParams();
    const [repository, setRepository] = useState<any>({});
    const [issues, setIssues] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [filterIndex, setFilterIndex] = useState<number>(0);
    const [filters, setFilsters] = useState<any>([
        {state: 'all', label: 'Todas', active: true},
        {state: 'open', label: 'Abertas', active: false},
        {state: 'closed', label: 'Fechadas', active: false},
    ])

    useEffect(() => {
        Promise.all([
            api.get(`/repos/${repositorio}`),
            api.get(`/repos/${repositorio}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5,
                    page: 1
                }
            })
        ])
        .then(res => {
           setRepository(res[0].data);
           setIssues(res[1].data);
           console.log(res[0].data)
        })
        .catch(error => {
            setIssues([]);
            setRepository({});
        })
        .finally(() => setLoading(false));
    }, [repositorio]);

    useEffect(() => {
        api.get(`/repos/${repositorio}/issues`, {
            params: {
                state: filters[filterIndex].state,
                per_page: 5,
                page: page
            }
        })
        .then(res => {
           setIssues(res.data);
           
        })
        .catch(error => {
            setIssues([]);
        })
    }, [repositorio, page, filterIndex, filters]);


    const handlePage = (acao: string) => {
        if(acao == 'voltar'){
            if(page == 1){
                setPage(1);
                return;
            }

            setPage(page-1);
            return;
        }

        setPage(page+1);
    }

    const handleSource = (index: number) => {
        setFilterIndex(index);
    }

    if(loading){
        return (
            <Loaging>
                <h1>Carregando...</h1>
            </Loaging>
        )
    }

    return(
        <Container>
            <BackButton to={'/'}>
                <FaArrowLeft color="#000" size={30}/>
            </BackButton>
            <Owner>
                <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>
            <IssuesList>
                <Filter active={filterIndex}>
                    {filters.map((filter: any, index: number) => (
                        <button 
                            type="button" 
                            key={index} 
                            onClick={() => handleSource(index)}
                        >
                            {filter.label}
                        </button>
                    ))}
                    
                </Filter>
                {issues.map((issue: any) => (
                    <li key={issue.id}>
                        <img src={issue.user.avatar_url} alt={issue.user.login}/>
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map((label: any) => (
                                    <span key={label.id}>{label.name}</span>
                                ))}
                            </strong>

                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>

            <PageActions>
                <button type="button" onClick={() => handlePage('voltar')} disabled={page < 2}>Voltar</button>
                <button type="button" onClick={() => handlePage('proxima')}>Proxima</button>
            </PageActions>
        </Container>
    );
}

export default Repositorio;