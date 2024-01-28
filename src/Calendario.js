import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('es');

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [eventos, setEventos] = useState([
    {
      id: 1,
      title: 'Evento 1',
      start: moment().toDate(),
      end: moment().add(1, 'hour').toDate(),
      draggable: true, // Este evento es arrastrable
    },
    {
      id: 2,
      title: 'Evento 2',
      start: moment().add(1, 'day').toDate(),
      end: moment().add(1, 'day').add(1, 'hour').toDate(),
      draggable: false, // Este evento no es arrastrable
    },
  ]);

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = eventos.map((item) =>
      item.id === event.id ? { ...item, start, end } : item
    );
    setEventos(updatedEvents);
  };

  const handleSelectEvent = (event) => {
    const title = prompt('Editar título:', event.title);
    if (title !== null) {
      const updatedEvents = eventos.map((item) =>
        item.id === event.id ? { ...item, title } : item
      );
      setEventos(updatedEvents);
    }
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        resizable
        selectable
        onSelectSlot={(slotInfo) =>
          console.log('Slot selected: ', slotInfo)
        }
        draggableAccessor={(event) => event.draggable} // Indica si un evento es arrastrable o no
      />
    </div>
  );
};

export default Calendario;
