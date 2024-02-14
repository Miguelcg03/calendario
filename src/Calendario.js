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

    const handleEventClick = (info) => {
        const title = prompt('Editar título:', info.event.title);
        const description = prompt('Editar descripción:', info.event.extendedProps.description);
        if (title !== null && description !== null) {
            const updatedEvents = events.map(event => {
                if (event.id === info.event.id) {
                    return { ...event, title, description };
                }
                return event;
            });
            setEvents(updatedEvents);
        }
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
                description
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