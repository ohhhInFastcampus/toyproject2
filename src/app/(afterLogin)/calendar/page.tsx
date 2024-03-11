'use client'
import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarContainer } from "./_components/CalendarStyles";
import EventModal from "./_components/AddEventModal";
import { ScheduleType } from "@/type/Schedule";
import EditModal from "./_components/EditModal";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Calendar = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const Id = Date.now().toString();
  const [userId, setUserId] = useState<string>(email ?? "");
  const [id, setId] = useState<string>(Id);
  const [events, setEvents] = useState<ScheduleType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEvent, setNewEvent] = useState<ScheduleType>({
    userId: userId,
    id: id,
    title: "",
    start: "",
    end: "",
    content: "",
    participant: "",
    backgroundColor: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollectionRef = collection(db, "schedule");
        const querySnapshot = await getDocs(eventsCollectionRef);

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
      userId: userId,
      id: id,
      title: "",
      start: "",
      end: "",
      content: "",
      participant: "",
      backgroundColor: "",
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event: ScheduleType = {
      ...newEvent,
      start: moment(data.date).format("YYYY-MM-DDTHH:mm:ss"),
      end: moment(data.date).format("YYYY-MM-DDTHH:mm:ss+0900"),
      title: data.draggedEl.title,
      id: `${new Date().getTime()}`,
    };
    setEvents([...events, event]);
    setShowModal(false);
    setNewEvent({
      userId: userId,
      id: id,
      title: "",
      start: "",
      end: "",
      content: "",
      participant: "",
      backgroundColor: "",
    });
  }

  function handleEditModal(clickedEvent: any) {
    const event: ScheduleType = {
      userId: userId,
      id: clickedEvent.event.id,
      title: clickedEvent.event.title,
      start: clickedEvent.event.start,
      end: clickedEvent.event.end,
      content: clickedEvent.event.extendedProps.content,
      participant: clickedEvent.event.extendedProps.participant,
      backgroundColor: clickedEvent.event.extendedProps.backgroundColor,
    };
    setNewEvent(event);
    setShowEditModal(true);
  }

  function handleDeleteEvent() {
    const updatedEvents = events.filter((event) => event.id !== newEvent.id);
    setEvents(updatedEvents);
    setShowEditModal(false);
  }

  function handleEditEvent(formData: ScheduleType) {
    const index = events.findIndex((event) => event.id === formData.id);

    if (index !== -1) {
      const updatedEvents = [...events];
      updatedEvents[index] = formData;
      setEvents(updatedEvents);
    }

    setShowEditModal(false);
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      userId: userId,
      id: id,
      title: "",
      start: "",
      end: "",
      content: "",
      participant: "",
      backgroundColor: "",
    });
  }

  function handleFormSubmit(formData: ScheduleType) {
    const start = moment(formData.start).toDate();
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
            userId={userId}
            id={id}
            isOpen={showModal}
          />
        )}
        {showEditModal && (
          <EditModal
            isOpen={showEditModal}
            event={newEvent}
            userId={userId}
            id={id}
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
