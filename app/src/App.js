import './App.css';
import { Login } from './components/login'
import { SignUp } from './components/sign-up';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';
import Admin from './Admin';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
