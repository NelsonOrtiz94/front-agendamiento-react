import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const goToEventList = () => {
    navigate('/eventlist');
  };

  return (
    <div className="homepage-container">
      <div className="content">
        <h1>Bienvenido a la Agenda de Eventos</h1>
        <p>Explora y mantente al tanto de los eventos importantes en tu comunidad.</p>
        <button onClick={goToEventList} className="explore-button">
          Agendar Evento
        </button>
      </div>
    </div>
  );
};

export default HomePage;
