"use client";
import React, { Fragment, useEffect, useState } from "react";
import moment from 'moment';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {Draggable, DropArg,} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarContainer } from "./CalendarStyles"; 
import EventModal from "./AddEventModal";
import { ScheduleType } from "../../../type/Schedule";
import EditModal from "./EditModal";

const Calendar = () => {
  const [events, setEvents] = useState<ScheduleType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [newEvent, setNewEvent] = useState<ScheduleType>({
    userId: "",
    id: "",
    title: "",
    start: "",
    end: "",
    content: "",
    participant: "",
  });

  function handleDateClick(arg: { date: Date }) {
    const newEvent: ScheduleType = {
      userId: "",
      id: "",
      title: "",
      start: "",
      end: "", 
      content: "",
      participant: "",
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event: ScheduleType = {
      ...newEvent,
      start: moment(data.date).format("YYYY-MM-DDTHH:mm:ss"), 
      end: moment(data.date).format("YYYY-MM-DDTHH:mm:ss"),
      title: data.draggedEl.title,
      id: `${new Date().getTime()}`,
    };
    setEvents([...events, event]);
    setShowModal(false);
    setNewEvent({
      userId: "",
      id: "",
      title: "",
      start: "",
      end: "",
      content: "",
      participant: "",
    });
  }

  function handleEditModal(data: { event: ScheduleType }) {
    setNewEvent(data.event); // Set the event data to be edited
    setShowEditModal(true); // Open the EditModal
    console.log(data)
  }
  

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      userId: "",
      id: "",
      title: "",
      start: "",
      end: "",
      content: "",
      participant: "",
    });
  }

  function handleFormSubmit(formData: ScheduleType) {
    const start = moment(formData.start).toDate(); // Convert Moment.js object to Date object
    const end = moment(formData.end).toDate();
  
    const event: ScheduleType = {
      ...formData,
      id: `${new Date().getTime()}`,
      start: start.toISOString(),
      end: end.toISOString(),
    };

    setEvents((prevEvents) => [...prevEvents, event]);
    setShowModal(false);
  }

  return (
    <>
      <CalendarContainer>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          events={events}
          nowIndicator={true}
          editable={true}
          droppable={true}
          selectable={true}
          selectMirror={true}
          dateClick={handleDateClick}
          drop={(data) => addEvent(data)}
          eventClick={(data) => handleEditModal(data)}
        />
        {showModal && (
          <EventModal
            onClose={handleCloseModal}
            onSubmit={handleFormSubmit}
            newEvent={newEvent}
            isOpen={showModal}
          />
        )}
        {showEditModal && (
          <EditModal 
            isOpen={showEditModal}
            event={newEvent}
            onClose={() => setShowEditModal(false)}
            onSubmit={(formData: ScheduleType) => {
             
              setShowEditModal(false);
            }}           
          />
        )}
      </CalendarContainer>
    </>
  );
};

export default Calendar;