import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); // Evento en edición
  const [newEvent, setNewEvent] = useState({
    tipo: '',
    encargado: '',
    fechaHora: '',
    ubicacion: '',
  }); // Evento nuevo o en edición

  // Fetch events from the backend
  const fetchEvents = () => {
    setLoading(true);
    axiosInstance
      .get('/eventos')
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Create or update event
  const saveEvent = () => {
    if (editingEvent) {
      // Update event
      axiosInstance
        .put(`/eventos/${editingEvent.id}`, newEvent)
        .then(() => {
          alert('Evento actualizado con éxito');
          fetchEvents();
          setEditingEvent(null);
          setNewEvent({ tipo: '', encargado: '', fechaHora: '', ubicacion: '' });
        })
        .catch(error => {
          console.error('Error updating event:', error);
        });
    } else {
      // Create event
      axiosInstance
        .post('/eventos', newEvent)
        .then(() => {
          alert('Evento creado con éxito');
          fetchEvents();
          setNewEvent({ tipo: '', encargado: '', fechaHora: '', ubicacion: '' });
        })
        .catch(error => {
          console.error('Error creating event:', error);
        });
    }
  };

  // Delete event
  const deleteEvent = (id) => {
    axiosInstance
      .delete(`/eventos/${id}`)
      .then(() => {
        alert('Evento eliminado con éxito');
        fetchEvents();
      })
      .catch(error => {
        console.error('Error deleting event:', error);
      });
  };

  // Notify event
  const notifyEvent = (id) => {
    axiosInstance
      .post(`/eventos/${id}/notificar`)
      .then(() => {
        alert('Notificación enviada con éxito');
      })
      .catch(error => {
        console.error('Error sending notification:', error);
      });
  };

  // Set event for editing
  const editEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({ ...event });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Gestión de Eventos</h2>

      {/* Formulario de creación/edición */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>{editingEvent ? 'Editar Evento' : 'Crear Evento'}</h3>
        <input
          type="text"
          placeholder="Tipo de Evento"
          value={newEvent.tipo}
          onChange={(e) => setNewEvent({ ...newEvent, tipo: e.target.value })}
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Encargado"
          value={newEvent.encargado}
          onChange={(e) =>
            setNewEvent({ ...newEvent, encargado: e.target.value })
          }
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="datetime-local"
          value={newEvent.fechaHora}
          onChange={(e) =>
            setNewEvent({ ...newEvent, fechaHora: e.target.value })
          }
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={newEvent.ubicacion}
          onChange={(e) =>
            setNewEvent({ ...newEvent, ubicacion: e.target.value })
          }
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button onClick={saveEvent} style={{ padding: '0.5rem 1rem' }}>
          {editingEvent ? 'Actualizar Evento' : 'Crear Evento'}
        </button>
      </div>

      {/* Lista de eventos */}
      {loading ? (
        <p>Cargando eventos...</p>
      ) : events.length === 0 ? (
        <p>No hay eventos disponibles en este momento.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events.map((evento) => (
            <li
              key={evento.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <h3>{evento.tipo}</h3>
              <p>
                <strong>Encargado:</strong> {evento.encargado}
              </p>
              <p>
                <strong>Fecha y Hora:</strong>{' '}
                {new Date(evento.fechaHora).toLocaleString()}
              </p>
              <p>
                <strong>Ubicación:</strong> {evento.ubicacion}
              </p>
              <div style={{ marginTop: '1rem' }}>
                <button
                  onClick={() => editEvent(evento)}
                  style={{
                    marginRight: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#ffa500',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteEvent(evento.id)}
                  style={{
                    marginRight: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#ff6f61',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Eliminar
                </button>
                <button
                  onClick={() => notifyEvent(evento.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2f4eff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Notificar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
