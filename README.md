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
```

## Instalación y Configuración
Clonar el repositorio:

```plaintext
git clone https://github.com/tu-usuario/agenda-eventos.git
cd agenda-eventos
```

## Instalar dependencias: Asegúrate de tener Node.js instalado y ejecuta:

```plaintext
npm install
```

## Configurar Axios: Edita la URL base en src/components/axiosConfig.js para apuntar al backend:

```plaintext
javascript
Copy code
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/api', // Cambia esto si tu backend está en otra URL
});
```

## Iniciar el servidor de desarrollo:

```
npm start
```

La aplicación estará disponible en http://localhost:3000.

## Uso
1. Accede a la página de inicio en http://localhost:3000/.
2. Haz clic en "Agendar Evento" para navegar a la página de gestión de eventos.
3. Crea nuevos eventos rellenando el formulario y haciendo clic en "Crear Evento".
4. Edita, elimina o notifica eventos desde la lista de eventos.
   
## Endpoints del Backend

La aplicación interactúa con los siguientes endpoints del backend:

- GET /eventos: Obtiene todos los eventos.
- POST /eventos: Crea un nuevo evento.
- PUT /eventos/:id: Actualiza un evento existente.
- DELETE /eventos/:id: Elimina un evento.
- POST /eventos/:id/notificar: Envía una notificación del evento.
  
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

¡Gracias por usar la Agenda de Eventos! 😊

