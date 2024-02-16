
// -- Titulo --
    // Calendario de React en Español
// -- Descripción --
    // La Aplicación de Calendario en React es una herramienta diseñada para ayudar a los usuarios a gestionar sus eventos diarios de manera eficiente· Permite añadir, modificar y eliminar eventos, así como también arrastrar y ampliar los eventos en las horas deseadas de un día·

// -- Características Principales --
    // + Gestión de Eventos: Los usuarios pueden crear, ver, modificar y eliminar eventos en el calendario·
    // + Interactividad: Los eventos pueden ser arrastrados para cambiar su hora de inicio y finalización, y también pueden ser ampliados o reducidos en duración·
    // + Colores Aleatorios: Los eventos se crean automáticamente con colores aleatorios para una mejor visualización y distinción·
    // + Compatibilidad con React: La aplicación está construida utilizando React, lo que permite una experiencia de usuario fluida y reactiva·

// -- Guía de Uso --
    // + Crear un Evento
        // Haga clic en el calendario·
        // Se abrirá un "prompt" donde puede ingresar los detalles del evento, como título y descripción·
    // + Modificar un Evento
        // Haga clic en el evento que desea modificar en el calendario·
        // Se abrirá un "prompt" con los detalles del evento seleccionado·
    // + Eliminar un Evento
        // Haga clic en la "X" del evento que desea eliminar en el calendario·
    // + Arrastrar y Ampliar Eventos
        // Para cambiar la hora de inicio de un evento, mantenga presionado el evento y arrástrelo a la nueva hora de inicio deseada·
        // Para cambiar la duración de un evento, seleccione el borde inferior del evento y arrástrelo para ampliar o reducir la duración del evento· 



// Importaciones de módulos necesarios
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendario.css';
import esLocale from '@fullcalendar/core/locales/es';
import { v4 as uuidv4 } from 'uuid';

// Componente principal del calendario
const Calendario = () => {
    // Estado para almacenar los eventos del calendario
    const [events, setEvents] = useState([
        {
            id: uuidv4(),
            title: 'Evento 1',
            start: '2024-01-28T10:00:00',
            end: '2024-01-28T12:00:00',
            description: 'Descripción del evento 1',
            color: 'green'
        },
        {
            id: uuidv4(),
            title: 'Evento 2',
            start: '2024-01-29T14:00:00',
            end: '2024-01-29T16:00:00',
            description: 'Descripción del evento 2',
            color: 'blue'
        }
    ]);

    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState("");
    // Estado para el evento seleccionado
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Manejador de eventos al hacer clic en un evento del calendario
    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
    };

    // Manejador de eventos al hacer clic en una fecha del calendario
    const handleDateClick = (info) => {
        // Solicitamos al usuario que ingrese el título y la descripción del evento
        const title = prompt('Agregar título:');
        const description = prompt('Agregar descripción:');
        // Si el usuario proporciona información, creamos un nuevo evento y lo agregamos al estado
        if (title !== null && description !== null) {
            const newEvent = {
                id: uuidv4(),
                title,
                start: info.dateStr,
                allDay: true,
                description,
                color: getRandomColor()
            };
            setEvents(prevEvents => [...prevEvents, newEvent]);
        }
    };

    // Manejador de eventos para eliminar un evento del calendario
    const handleDeleteEvent = (eventId) => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    };

    // Filtramos los eventos según el término de búsqueda
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para obtener un color aleatorio
    const getRandomColor = () => {
        const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Retornamos la interfaz del calendario
    return (
        <div>
            {/* Input para buscar eventos */}
            <input className="search-input"
                type="text"
                placeholder="Buscar evento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Input para seleccionar color (oculto) */}
            <input
                type="color"
                style={{ visibility: "hidden" }}
                value={selectedEvent ? selectedEvent.color : "#000000"}
            />
            {/* Componente FullCalendar con sus propiedades y eventos */}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                locale={esLocale}
                firstDay={1}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                editable={true}
                events={filteredEvents}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
                eventContent={(arg) => (
                    <div className="event-container">
                        <div>{arg.timeText}</div>
                        <div>{arg.event.title}</div>
                        <button className="delete-button" onClick={() => handleDeleteEvent(arg.event.id)}>X</button>
                    </div>
                )}
            />
        </div>
    );
};

export default Calendario;