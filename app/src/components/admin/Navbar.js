// Navbar.js
import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import {signOut} from 'firebase/auth';
import { auth } from '../../service/firebase-config';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
  const { changeUserId } = useContext(UserContext);
    const logOut = async(e)=>{
        await signOut(auth);
        localStorage.removeItem('idUser');
        navigate('/')
    }
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Le contenu de votre barre de navigation ici */}

      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block" />
        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <div className="d-sm-flex align-items-center justify-content-between">
            <a
              onClick={logOut}
              className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm" // Changez la classe de btn-primary à btn-danger
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-white-50" /> Déconnexion
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
