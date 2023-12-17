import React from "react";
import '../style/sign-up.css'
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { UserContext } from '../context/userContext'
import { database } from "../service/firebase-config";

export const SignUp = () => {
    const navigate = useNavigate();
    const { SignUp } = useContext(UserContext);
    const [nom, setNom] = useState('');
    const [mdp, setMdp] = useState('');
    const [confMdp, setConfMdp] = useState('');
    const [email, setEmail] = useState('');
    const [idPrise, setIdPrise] = useState('');
    const [nomPrise, setNomPrise] = useState('');
    const [tagPrise, setTagPrise] = useState('');
    const onChangeNom = (e) => {
        setNom(e.target.value);
    }
    const onChangeMdp = (e) => {
        setMdp(e.target.value);
    }
    const onChangeConfMdp = (e) => {
        setConfMdp(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangeIdPrise = (e) => {
        setIdPrise(e.target.value);
    }
    const onChangeNomPrise = (e) => {
        setNomPrise(e.target.value);
    }
    const onChangeTagPrise = (e)=>{
        setTagPrise(e.target.value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const cred = await SignUp(email, mdp);
            const id_user = cred.user.uid;
            const userRef = collection(database, 'user');
            await addDoc(userRef, {
                id: id_user,
                nom: nom,
                prise: [{
                    nom: nomPrise,
                    id_prise: idPrise,
                    tag: tagPrise
                }]
            })
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Inscription</h3>
                                    <form onSubmit={onSubmit}>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <input type="text" id="firstName" value={nom} onChange={onChangeNom} className="form-control form-control-lg" />
                                                    <label className="form-label" for="firstName">Nom</label>
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <input type="text" id="lastName" value={tagPrise} onChange={onChangeTagPrise} className="form-control form-control-lg" />
                                                    <label className="form-label" for="lastName">Étiquette du prise</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4 d-flex align-items-center">

                                                <div className="form-outline datepicker w-100">
                                                    <input type="email" value={email} onChange={onChangeEmail} className="form-control form-control-lg" id="birthdayDate" />
                                                    <label for="birthdayDate" className="form-label">Email</label>
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <input type="text" id="phoneNumber" value={nomPrise} onChange={onChangeNomPrise} className="form-control form-control-lg" />
                                                    <label className="form-label" for="phoneNumber">Nom du prise connecté</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <input type="password" id="phoneNumber" value={mdp} onChange={onChangeMdp} className="form-control form-control-lg" />
                                                    <label className="form-label" for="phoneNumber">Mot de passe</label>
                                                </div>

                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <input type="text" id="emailAddress" value={idPrise} onChange={onChangeIdPrise} className="form-control form-control-lg" />
                                                    <label className="form-label" for="emailAddress">Id du prise connecté</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <input type="password" id="phoneNumber" value={confMdp} onChange={onChangeConfMdp} className="form-control form-control-lg" />
                                                    <label className="form-label" for="phoneNumber">Confirmation de mot de passe</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="mt-4 pt-2">
                                            <input className="btn btn-primary btn-lg" type="submit" value="S'inscrire" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}