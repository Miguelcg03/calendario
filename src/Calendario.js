import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendario.css';
import esLocale from '@fullcalendar/core/locales/es';
import { v4 as uuidv4 } from 'uuid';

const Calendario = () => {
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

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
    };

  

    const handleDateClick = (info) => {
        const title = prompt('Agregar título:');
        const description = prompt('Agregar descripción:');
        if (title !== null && description !== null) {
            const newEvent = {
                id: uuidv4(),
                title,
                start: info.dateStr,
                allDay: true,
                description,
                color: getRandomColor() // Asignar un color aleatorio al nuevo evento
            };
            setEvents(prevEvents => [...prevEvents, newEvent]);
        }
    };

    const handleDeleteEvent = (eventId) => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRandomColor = () => {
        const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div>
            <input className="search-input"
                type="text"
                placeholder="Buscar evento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
           
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
