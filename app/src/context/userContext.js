import { createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../service/firebase-config';
import { getDocs, collection, query, where, getFirestore } from 'firebase/firestore';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [idUser, setIdUser] = useState('');
  const [idPrise, setIdPrise] = useState('');

  const SignUp = (email, pwd) => {
    return createUserWithEmailAndPassword(
      auth,
      email,
      pwd
    );
  };

  const SignIn = (email, pwd) => {
    return signInWithEmailAndPassword(
      auth,
      email,
      pwd
    );
  };

  const fetchData = async () => {
    const db = getFirestore();
    const chartCollection = collection(db, 'user');
    const userQuery = query(chartCollection, where('id', '==', localStorage.getItem('idUser')));

    try {
      const snapshot = await getDocs(userQuery);

      const userQueryArray = snapshot.docs.map(doc => doc.data());

      return userQueryArray[0].prise[0].id_prise;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    const fetchAndSetIdPrise = async () => {
      const id = await fetchData();
      setIdPrise(id);
    };

    fetchAndSetIdPrise();
  }, [localStorage.getItem('idUser')]);

  useEffect(() => {
    console.log(idPrise); // Effectuez d'autres actions ici lorsque idPrise change
  }, [idPrise]);

  return (
    <UserContext.Provider value={{ SignUp, SignIn, currentUser, idUser, idPrise }}>
      {props.children}
    </UserContext.Provider>
  );
};
