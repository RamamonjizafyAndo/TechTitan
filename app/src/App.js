import './App.css';
import { Login } from './components/login'
import { SignUp } from './components/sign-up';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
