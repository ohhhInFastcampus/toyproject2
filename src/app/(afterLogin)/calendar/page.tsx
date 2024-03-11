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
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 function from uuid

const Calendar = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const [userId, setUserId] = useState<string>(email ?? "");
  const [events, setEvents] = useState<ScheduleType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEvent, setNewEvent] = useState<ScheduleType>({
    userId: userId,
    id: "", // Initial value is empty
    title: "",
    start: "",
    end: "",
    content: "",
    participant: "",
    backgroundColor: "",
    textColor: "black",
    borderColor: "#DEDEDE",
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
      id: "", // Generate UUID uuidv4()
      title: "",
      start: "",
      end: "",
      content: "",
      participant: "",
      backgroundColor: "",
      textColor: "black",
      borderColor: "#DEDEDE",
    };
    setNewEvent(newEvent); // Set the newEvent state for EventModal
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event: ScheduleType = {
      ...newEvent, // Use the same newEvent state
      start: moment(data.date).format("YYYY-MM-DDTHH:mm:ss"),
      end: moment(data.date).format("YYYY-MM-DDTHH:mm:ss"),
      title: data.draggedEl.title,
      // id: newEvent.id || uuidv4(), // If id is not set, generate UUID
      textColor: "black",
      borderColor: "#DEDEDE",
    };
    setEvents([...events, event]);
    setShowModal(false);
    setNewEvent({
      userId: userId,
      id: "", // Reset id for the next new event
      title: "",
      start: "",
      end: "",
      content: "",
      participant: "",
      backgroundColor: "",
      textColor: "black",
      borderColor: "#DEDEDE",
    });
  }

  function handleEditModal(clickedEvent: any) {
    const event: ScheduleType = {
      userId: userId,
      id: clickedEvent.event.id,
      title: clickedEvent.event.title,
      start: clickedEvent.event.start,
      end: clickedEvent.event.end,
      content: clickedEvent.event.extendedProps?.content || "", // Use default value if undefined
      participant: clickedEvent.event.extendedProps?.participant || "", // Use default value if undefined
      backgroundColor: clickedEvent.event.backgroundColor || "", // Use default value if undefined
      textColor: clickedEvent.event.textColor || "", // Use default value if undefined
      borderColor: clickedEvent.event.borderColor || "", // Use default value if undefined
    };
    setNewEvent(event);
    setShowEditModal(true);
    console.log(event)
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
      id: "", // Reset id when closing modal
      title: "",
      start: "",
      end: "",
      content: "",
      participant: "",
      backgroundColor: "",
      textColor: "black",
      borderColor: "#DEDEDE",
    });
  }

  function handleFormSubmit(formData: ScheduleType) {
    const start = moment(formData.start).toDate();
    const end = moment(formData.end).toDate();

    const event: ScheduleType = {
      ...formData,
      // id: newEvent.id || uuidv4(), // If id is not set, generate UUID
      start: start.toISOString(),
      end: end.toISOString(),
      textColor: "black",
      borderColor: "#DEDEDE",
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
            onSubmit={(newEvent) => handleFormSubmit(newEvent)}
            userId={userId}
            id={newEvent.id || ""}
            isOpen={showModal}
          />
        )}
        {showEditModal && (
          <EditModal
            isOpen={showEditModal}
            event={newEvent}
            userId={userId}
            id={newEvent.id || ""}
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
