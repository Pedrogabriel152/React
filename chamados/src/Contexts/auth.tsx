import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import { auth, db } from "../Services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Toastify
import { toast } from "react-toastify";

export const AuthContext = createContext({});

const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<any>(null);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storageUser = localStorage.getItem('@ticketsPRO');

        if(!storageUser){
            setLoading(false);
            return
        }

        setUser(JSON.parse(storageUser));
        setLoading(false);
    }, []);

    const signIn = async (email: string, password: string) => {
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value: any) => {
            let uid = value.user.uid

            const docRef = doc(db, "users", uid);
            const docSnap: any = await getDoc(docRef);

            if(docSnap) {
                let data: object = {
                    uid: uid,
                    name: docSnap.data().name,
                    email: value.user.email,
                    avatarUrlÇ: docSnap.data().avatarUrl
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success(`Bem vindo de volta ${docSnap.data().name}!`);
                navigate('/dashboard');
                return
            }   
        
        } )
        .catch((error: any) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error("Algo deu errado");
        })

    }

    const signUp = async (name: string, email: string, password: string) => {
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value: any) => {
            let uid = value.user.uid

            await setDoc(doc(db, 'users', uid), {
                name: name,
                avatarUrl: null
            })
            .then(() => {
                let data: object = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrlÇ: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success("Seja Bem vindo ao sistema!");
                navigate('/dashboard');
            })
        })
        .catch((error: any) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }

    const storageUser = (data: any) => {
        localStorage.setItem('@ticketsPRO', JSON.stringify(data));
    }

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('@ticketsPRO');
        setUser(null);
        navigate('/');
    }

    return (
        <AuthContext.Provider 
            value={{
                signed: !!user, 
                user,
                signIn,
                signUp,
                loadingAuth,
                loading,
                logout,
                storageUser,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;