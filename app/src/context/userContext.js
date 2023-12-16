import { createContext, useState, useEffect } from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../service/firebase-config';

export const UserContext = createContext();

export const UserContextProvider = (props)=>{
    const [currentUser, setCurrentUser] = useState()
    const [userId, setUserId] = useState('')
    const [idUser, setIdUser] = useState('');
    const SignUp = (email, pwd) =>{
       return createUserWithEmailAndPassword(
            auth,
            email, 
            pwd
        )
    }
    const changeUserId = (userId)=>{
        setUserId(userId)
    }
    const SignIn = (email, pwd) =>{
        return signInWithEmailAndPassword(
            auth,
            email,
            pwd
        )
    }
    return(
        <UserContext.Provider value={{SignUp, SignIn, currentUser, idUser, setIdUser, changeUserId, userId}}>
            {props.children}
        </UserContext.Provider>
    )
}