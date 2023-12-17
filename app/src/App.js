// App.js
import './App.css';
import './style/Admin.css';
import { Login } from './components/login';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import Sidebar from './components/admin/Sidebar';
import MainContent from './components/admin/MainContent';
import Table from './components/admin/Table';
import Historic from './components/admin/historic';
import Chat from './components/admin/chat';
import Whatsapp from './components/admin/whatsapp';
import { UserContext } from './context/userContext';
import Facturation from './components/admin/Facturation';
import { SignUp } from './components/sign-up';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem('idUser'));
    if (localStorage.getItem('idUser')) {
      // Check the current route before navigating
      if (window.location.pathname !== '/dashboard') {
        navigate('/dashboard');
      }
    }
  }, [localStorage.getItem('idUser')]);

  return (
    <>
      {localStorage.getItem('idUser') ? (
        <Sidebar>
          <Routes>
            <Route path='/dashboard' element={<MainContent />} />
            <Route path='/table' element={<Table />} />
            <Route path='/historique' element={<Historic />} />
            <Route path='/chatbot' element={<Chat />} />
            <Route path='/whatsapp' element={<Whatsapp />} />
            <Route path='/facturation' element={<Facturation />} />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      )}
    </>
  );
}

export default App;
