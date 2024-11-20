# Agendamiento de Eventos - Frontend

Link al proyecto: [Front agendamiento con REACT + VITE](https://front-agenda-react.netlify.app/)

## Descripción
Este proyecto es un frontend para una aplicación de gestión de eventos que permite a los usuarios crear, editar, eliminar, y notificar eventos. La aplicación está construida con **React** y utiliza **React Router** para la navegación entre páginas.

El frontend interactúa con un backend REST API para realizar operaciones CRUD sobre los eventos, y está diseñado para ser elegante y fácil de usar.

## Características
- Página de bienvenida que introduce a los usuarios a la aplicación.
- Lista de eventos obtenida dinámicamente desde el backend.
- Formulario para crear y editar eventos.
- Funcionalidades de eliminación y notificación de eventos.
- Navegación intuitiva entre las páginas de la aplicación.

## Tecnologías Utilizadas
- **React**: Librería para la construcción de la interfaz de usuario.
- **React Router**: Manejo de rutas y navegación.
- **Axios**: Cliente HTTP para la comunicación con el backend.
- **CSS**: Estilización de los componentes.
- **JavaScript (ES6+)**: Lógica y funcionalidad.

## Estructura del Proyecto
```plaintext
src/
├── components/
│   └── axiosConfig.js     # Configuración de Axios para la API
├── pages/
│   ├── HomePage.js        # Página de bienvenida
│   ├── EventList.js       # Página de gestión de eventos
├── App.js                 # Componente principal
├── index.js               # Punto de entrada del frontend
└── styles/
    └── HomePage.css       # Estilos específicos de HomePage

