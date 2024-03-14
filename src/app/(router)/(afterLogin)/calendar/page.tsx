'use client'
import React, { useEffect, useState } from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarContainer } from "./_components/CalendarStyles";
import EventModal from "./_components/AddEventModal";
import { ScheduleType } from "@/type/Schedule";
import EditModal from "./_components/EditModal";
import { db } from "@/firebase";
import { collection,getDocs,
} from "firebase/firestore";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid"; 

const Calendar = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const [userId, setUserId] = useState<string>(email ?? "");
  const [events, setEvents] = useState<ScheduleType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEvent, setNewEvent] = useState<ScheduleType>({
    userId: userId,
    id: "", 
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
          const event = doc.data() as ScheduleType;
          // Convert start and end strings to Date objects (FullCalendar)
          event.start = moment(event.start).format("YYYY-MM-DDTHH:mm:ss");
          event.end = moment(event.end).format("YYYY-MM-DDTHH:mm:ss");
          fetchedEvents.push(event);
        });

        setEvents(fetchedEvents);
        console.log(fetchedEvents)
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

  }, []);

  function handleDateClick(arg: { date: Date }) {
    const clickedDate = moment(arg.date).format("YYYY-MM-DDTHH:mm:ss");
    const newEvent: ScheduleType = {
      userId: userId,
      id: "", 
      title: "",
      start: clickedDate, 
      end: clickedDate, 
      content: "",
      participant: "",
      backgroundColor: "",
      textColor: "black",
      borderColor: "#DEDEDE",
    };
    setNewEvent(newEvent); 
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event: ScheduleType = {
      ...newEvent, 
      start: moment(data.date).format("YYYY-MM-DDTHH:mm:ss"),
      end: moment(data.date).format("YYYY-MM-DDTHH:mm:ss"),
      title: data.draggedEl.title,
      textColor: "black",
      borderColor: "#DEDEDE",
    };
    setEvents([...events, event]);
    setShowModal(false);
    setNewEvent({
      userId: userId,
      id: "", 
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
      content: clickedEvent.event.extendedProps?.content || "",
      participant: clickedEvent.event.extendedProps?.participant || "",
      backgroundColor: clickedEvent.event.backgroundColor || "",
      textColor: clickedEvent.event.textColor || "",
      borderColor: clickedEvent.event.borderColor || "",
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
      id: "", 
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
    const start = moment(formData.start).format("YYYY-MM-DDTHH:mm:ss");
    const end = moment(formData.end).format("YYYY-MM-DDTHH:mm:ss");

    const event: ScheduleType = {
      ...formData,
      id: formData.id || uuidv4(), 
      start: start,
      end: end,
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
