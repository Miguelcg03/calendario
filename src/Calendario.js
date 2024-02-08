import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendario.css';
import esLocale from '@fullcalendar/core/locales/es';

const Calendario = () => {
    const [events, setEvents] = useState([
        {
            title: 'Evento 1',
            start: '2024-01-28T10:00:00',
            end: '2024-01-28T12:00:00',
            description: 'Descripción del evento 1'
        },
        {
            title: 'Evento 2',
            start: '2024-01-29T14:00:00',
            end: '2024-01-29T16:00:00',
            description: 'Descripción del evento 2'
        }
    ]);

    const handleEventDrop = (info) => {
        console.log('Evento arrastrado:', info.event);
        // Aquí manejar la lógica para guardar los cambios en el evento
    };

    const handleEventResize = (info) => {
        console.log('Evento redimensionado:', info.event);
        // Aquí  manejar la lógica para guardar los cambios en el evento
    };

    const handleEventClick = (info) => {
        const title = prompt('Editar título:', info.event.title);
        const description = prompt('Editar descripción:', info.event.extendedProps.description);
        if (title !== null && description !== null) {
            info.event.setProp('title', title);
            info.event.setExtendedProp('description', description);
            // Aquí manejar la lógica para guardar los cambios en el evento
        }
    };

    const handleDateClick = (info) => {
        const title = prompt('Agregar título:');
        const description = prompt('Agregar descripción:');
        if (title !== null && description !== null) {
            setEvents([
                ...events,
                { title, start: info.dateStr, allDay: true, description }
            ]);
            // Aquí  manejar la lógica para guardar el nuevo evento
        }
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            locale={esLocale}
            firstDay={1} // 0: Domingo, 1: Lunes, 2: Martes, etc.
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            editable={true}
            events={events}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
        />
    );
};

export default Calendario;
