import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<any>(null);

    const signIn = (email: string, password: string) => {
        console.log(email);
        console.log(password);
        alert('Logado com sucesso');
    }

    const signUp = (name: string, email: string, password: string) => {
        console.log(name)
    }

    return (
        <AuthContext.Provider 
            value={{
                signed: !!user, 
                user,
                signIn,
                signUp
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;