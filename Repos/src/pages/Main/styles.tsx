import styled from 'styled-components';

export const Container = styled.div`
    max-width: 700px;
    background: #FFF;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,.2);
    padding: 30px;
    margin: 80px auto;

    h1{
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        svg{
            margin-right: 3px;
        }
    }
`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    
    input{
        flex: 1;
        border: 1px solid #DDD;
        padding: 10px 15px;
        border-radius: 6px;
        font-size: 17px;
    }
`;

export const SubmitButton = styled.button.attrs((props: any) => ({
    type: 'submit',
    disable: props.loading
}))`
    background: #0D2636;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    &[disable]{
        cursor: not-allowed;
        opacity: 0.5;

    }
`;