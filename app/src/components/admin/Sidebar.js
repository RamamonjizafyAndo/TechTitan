import React from 'react';
import Navbar from './Navbar'; // Importez le composant Navbar ici
import Footer from '../Footer';
import { NavLink } from 'react-router-dom';

function Sidebar({ children }) {
  return (
    <>
      <div style={{ display: 'flex' }}>
        {/* Navbar */}
        

        {/* Sidebar */}
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            width: '250px',
            zIndex: '1000',
          }}
        >
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink" />
            </div>
            <div className="sidebar-brand-text mx-3">Selector</div>
          </a>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item">
            <NavLink
              to={'/dashboard'}
              className="nav-link"
              activeClassName="active-link"
              exact
            >
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">OK</div>
          <li className="nav-item">
            <NavLink
              to={'/table'}
              className="nav-link"
              activeClassName="active-link"
            >
              <i className="fas fa-fw fa-cog" />
              <span>Prises connectés</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={'/historique'}
              className="nav-link"
              activeClassName="active-link"
            >
              <i className="fas fa-fw fa-wrench" />
              <span>Historique de consommation</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={'/facturation'}
              className="nav-link"
              activeClassName="active-link"
            >
              <i className="fas fa-fw fa-wrench" />
              <span>Facturation</span>
            </NavLink>
          </li>
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">Fonctionnalités externes</div>
          <li className="nav-item">
            <NavLink
              to={'/chatbot'}
              className="nav-link"
              activeClassName="active-link"
            >
              <i className="fas fa-fw fa-folder" />
              <span>ChatBot</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={'/whatsapp'}
              className="nav-link"
              activeClassName="active-link"
            >
              <i className="fas fa-fw fa-chart-area" />
              <span>Intégration WhatsApp</span>
            </NavLink>
          </li>
        </ul>

        {/* Contenu principal */}
        <div style={{ marginLeft: '250px', flex: '1', padding: '20px' }}>
        <Navbar />
          {children}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
