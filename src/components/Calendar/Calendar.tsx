"use client"
import React, { Fragment, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import styled from 'styled-components';
import EventModal from './AddEventModal'
import { Props } from './AddEventModal';

interface ScheduleType {
  userId: string;
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  content: string;
  participant: string;
}

// Styled components
const CalendarContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Calendar = () => {
  const [events, setEvents] = useState<ScheduleType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<ScheduleType>({
    userId: '',
    id: '',
    title: '',
    startDate: '',
    endDate: '',
    content: '',
    participant: ''
  });

  function handleDateClick(arg: { date: Date}) {
    setNewEvent({ ...newEvent, id: `${new Date().getTime()}` });
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event: ScheduleType = {
      ...newEvent,
      startDate: data.date.toISOString(),
      endDate: data.date.toISOString(),
      title: data.draggedEl.title,
      id: `${new Date().getTime()}`
    };
    setEvents([...events, event]);
    setShowModal(false);
    setNewEvent({
      userId: '',
      id: '',
      title: '',
      startDate: '',
      endDate: '',
      content: '',
      participant: ''
    });
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      userId: '',
      id: '',
      title: '',
      startDate: '',
      endDate: '',
      content: '',
      participant: ''
    });
  }


  function handleFormSubmit(formData: ScheduleType) {
    const event: ScheduleType = {
      ...formData,
      id: `${new Date().getTime()}`
    };
    setEvents(prevEvents => [...prevEvents, event]);
    setShowModal(false); 
    console.log(formData)
  }

  return (
    <>
      <CalendarContainer>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'resourceTimelineWeek, dayGridMonth, timeGridWeek'
          }}
          events={events}
          nowIndicator={true}
          editable={true}
          droppable={true}
          selectable={true}
          selectMirror={true}
          dateClick={handleDateClick}
          drop={(data) => addEvent(data)}
        />
        {showModal && (
          <EventModal
            onClose={handleCloseModal}
            onSubmit={handleFormSubmit}
            newEvent={newEvent}
            isOpen={showModal}        
          />
        )}
      </CalendarContainer>
    </>
  );
}

export default Calendar;