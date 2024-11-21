import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import './EventList.css'; // Importar el archivo CSS

const EventList = () => {
  const [events, setEvents] = useState([]); // Lista de eventos
  const [loading, setLoading] = useState(false); // Estado de carga
  const [editingEvent, setEditingEvent] = useState(null); // Evento en edición
  const [newEvent, setNewEvent] = useState({
    tipo: '',
    encargado: '',
    fechaHora: '',
    ubicacion: '',
    emailCiudadano: '', // Campo agregado
  });

  const fetchEvents = () => {
    setLoading(true);
    axiosInstance
      .get('/evento')
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error.response?.data || error.message);
        alert('Error al obtener los eventos. Intente nuevamente.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const validateEvent = (event) => {
    if (!event.tipo || event.tipo.length < 3 || event.tipo.length > 50) {
      return 'El tipo de evento debe tener entre 3 y 50 caracteres.';
    }
    if (!event.encargado || event.encargado.length < 3 || event.encargado.length > 50) {
      return 'El nombre del encargado debe tener entre 3 y 50 caracteres.';
    }
    if (!event.fechaHora) {
      return 'La fecha y hora son obligatorias.';
    }
    if (!event.ubicacion || event.ubicacion.length < 5 || event.ubicacion.length > 100) {
      return 'La ubicación debe tener entre 5 y 100 caracteres.';
    }
    if (!event.emailCiudadano || !/\S+@\S+\.\S+/.test(event.emailCiudadano)) {
      return 'El correo del ciudadano debe ser válido.';
    }
    return null;
  };

  const saveEvent = () => {
    const error = validateEvent(newEvent);
    if (error) {
      alert(error);
      return;
    }

    const payload = { ...newEvent };

    const request = editingEvent
      ? axiosInstance.put(`/evento/${editingEvent.id}`, payload)
      : axiosInstance.post('/evento', payload);

    request
      .then(() => {
        alert(editingEvent ? 'Evento actualizado con éxito' : 'Evento creado con éxito');
        fetchEvents();
        setEditingEvent(null);
        setNewEvent({
          tipo: '',
          encargado: '',
          fechaHora: '',
          ubicacion: '',
          emailCiudadano: '',
        });
      })
      .catch((error) => {
        console.error('Error saving event:', error.response?.data || error.message);
        alert('Error al guardar el evento. Verifique los datos e intente nuevamente.');
      });
  };

  const deleteEvent = (id) => {
    axiosInstance
      .delete(`/evento/${id}`)
      .then(() => {
        alert('Evento eliminado con éxito');
        fetchEvents();
      })
      .catch((error) => {
        console.error('Error deleting event:', error.response?.data || error.message);
        alert('Error al eliminar el evento.');
      });
  };

  const notifyEvent = (id) => {
    axiosInstance
      .post(`/evento/${id}/notificaciones`)
      .then(() => {
        alert('Notificación enviada con éxito');
      })
      .catch((error) => {
        console.error('Error sending notification:', error.response?.data || error.message);
        alert('Error al enviar la notificación.');
      });
  };

  const editEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({ ...event });
  };

  return (
    <div className="container">
      <h2>Gestión de Eventos</h2>
      <div className="form-section">
        <h3>{editingEvent ? 'Editar Evento' : 'Crear Evento'}</h3>
        <input
          type="text"
          placeholder="Tipo de Evento"
          value={newEvent.tipo}
          onChange={(e) => setNewEvent({ ...newEvent, tipo: e.target.value })}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Encargado"
          value={newEvent.encargado}
          onChange={(e) => setNewEvent({ ...newEvent, encargado: e.target.value })}
          className="form-input"
        />
        <input
          type="datetime-local"
          value={newEvent.fechaHora}
          onChange={(e) => setNewEvent({ ...newEvent, fechaHora: e.target.value })}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={newEvent.ubicacion}
          onChange={(e) => setNewEvent({ ...newEvent, ubicacion: e.target.value })}
          className="form-input"
        />
        <input
          type="email"
          placeholder="Correo del Ciudadano"
          value={newEvent.emailCiudadano}
          onChange={(e) => setNewEvent({ ...newEvent, emailCiudadano: e.target.value })}
          className="form-input"
        />
        <button onClick={saveEvent} className="form-button">
          {editingEvent ? 'Actualizar Evento' : 'Crear Evento'}
        </button>
      </div>
      <ul className="event-list">
        {loading ? (
          <p>Cargando eventos...</p>
        ) : events.length === 0 ? (
          <p>No hay eventos disponibles en este momento.</p>
        ) : (
          events.map((evento) => (
            <li key={evento.id} className="event-item">
              <h3>{evento.tipo}</h3>
              <p><strong>Encargado:</strong> {evento.encargado}</p>
              <p><strong>Fecha y Hora:</strong> {new Date(evento.fechaHora).toLocaleString()}</p>
              <p><strong>Ubicación:</strong> {evento.ubicacion}</p>
              <p><strong>Correo:</strong> {evento.emailCiudadano || 'No asignado'}</p>
              <div className="event-actions">
                <button onClick={() => editEvent(evento)} className="event-button edit-button">
                  Editar
                </button>
                <button onClick={() => deleteEvent(evento.id)} className="event-button delete-button">
                  Eliminar
                </button>
                <button onClick={() => notifyEvent(evento.id)} className="event-button notify-button">
                  Notificar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default EventList;
