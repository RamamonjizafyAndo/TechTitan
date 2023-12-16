import React from "react"
import Logo from '../assets/logo.png'
import { useState, useContext } from 'react';
import {UserContext} from '../context/userContext'
import { useNavigate } from 'react-router-dom';

export const Login = ()=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const {SignIn, changeUserId, userId} = useContext(UserContext);
    const onChangeMail = (e)=>{
        setEmail(e.target.value);
    }
    const onChangeMdp = (e)=>{
        setMdp(e.target.value);
    }
    const onSubmit = async(e)=>{
        e.preventDefault();
        try{
            const cred = await SignIn(email, mdp);
            await changeUserId(cred.user.uid);
            navigate('/test');
        }catch(err){
            console.log(err);
        }
        
    }
    return(
    <>
    <section className="vh-100" style={{backgroundColor: "#9A616D"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block" style={{margin:'auto'}}>
              <img src={Logo}
                alt="login form" style={{borderRadius: "1rem 0 0 1rem", width: "100%"}} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form onSubmit={onSubmit}>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                    <span className="h1 fw-bold mb-0">Logo</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Connexion</h5>

                  <div className="form-outline mb-4">
                    <input type="email" value={email} onChange={onChangeMail} id="form2Example17" className="form-control form-control-lg" />
                    <label className="form-label" for="form2Example17">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" value={mdp} onChange={onChangeMdp} id="form2Example27" className="form-control form-control-lg" />
                    <label className="form-label" for="form2Example27">Mot de passe</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">Se connecter</button>
                  </div>

                  <a className="small text-muted" href="#!">Mot de passe oublié?</a>
                  <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Vous n'avez pas encore un compte? <a href="/sign-up"
                      style={{color: "#393f81"}}>S'inscrire</a></p>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>)
}