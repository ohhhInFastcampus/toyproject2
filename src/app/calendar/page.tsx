"use client";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {DropArg,} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarContainer } from "./_components/CalendarStyles"; 
import EventModal from "./_components/AddEventModal";
import { ScheduleType } from "../../../type/Schedule";
import EditModal from "./_components/EditModal";
import { db } from "@/firebase"; 
import { collection, getDocs } from "firebase/firestore";

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
    backgroundColor: ""
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollectionRef = collection(db, "schedule"); // "schedule" 컬렉션에 대한 참조
        const querySnapshot = await getDocs(eventsCollectionRef); // 컬렉션에서 문서 가져오기

        const fetchedEvents: ScheduleType[] = [];
        querySnapshot.forEach((doc) => {
          fetchedEvents.push(doc.data() as ScheduleType);
        });

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  

  function handleDateClick(arg: { date: Date }) {
    const newEvent: ScheduleType = {
      userId: "",
      id: "",
      title: "",
      start: "",
      end: "", 
      content: "",
      participant: "",
      backgroundColor: ""
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
      allDay: true
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
      backgroundColor: ""
    });
  }

  function handleEditModal(clickedEvent: any) {
    const event: ScheduleType = {
      userId: "",
      id: clickedEvent.event.id,
      title: clickedEvent.event.title,
      start: clickedEvent.event.start,
      end: clickedEvent.event.end,
      content: clickedEvent.event.extendedProps.content, 
      participant: clickedEvent.event.extendedProps.participant, 
      backgroundColor: clickedEvent.event.extendedProps.backgroundColor
    };
    setNewEvent(event); 
    setShowEditModal(true);
    console.log(event)
}
  
  function handleDeleteEvent() {
    const updatedEvents = events.filter(event => event.id !== newEvent.id)
    setEvents(updatedEvents)
    setShowEditModal(false)
  }
  
  function handleEditEvent(formData: ScheduleType) {
    // Find the index of the edited event in the events array
    const index = events.findIndex(event => event.id === formData.id);
  
    if (index !== -1) {
      // Update the events array with the edited event data
      const updatedEvents = [...events];
      updatedEvents[index] = formData;
      setEvents(updatedEvents);
    }
  
    // Close the EditModal
    setShowEditModal(false);
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
      backgroundColor: ""
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
            onDelete={handleDeleteEvent}
            onSubmit={handleEditEvent}           
          />
        )}
      </CalendarContainer>
    </>
  );
};

export default Calendar;