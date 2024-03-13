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

const Calendar = () => {
  const [events, setEvents] = useState<ScheduleType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEvent, setNewEvent] = useState<ScheduleType>({
    userId: "",
    id: "",
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
        const eventsCollectionRef = collection(db, "schedule"); // "schedule" 컬렉션에 대한 참조
        const querySnapshot = await getDocs(eventsCollectionRef); // 컬렉션에서 문서 가져오기

        const fetchedEvents: ScheduleType[] = [];
        querySnapshot.forEach((doc) => {
          const event = doc.data() as ScheduleType;
          // Convert start and end strings to Date objects
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
      userId: "",
      id: "",
      title: "",
      start: clickedDate, // Use the clicked date as a string
      end: clickedDate, // Use the same clicked date for start and end as string
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
      end: moment(data.date).format("YYYY-MM-DDTHH:mm:ss"),
      title: data.draggedEl.title,
      textColor: "black",
      borderColor: "#DEDEDE",

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
      backgroundColor: "",
    });
  }

  function handleEditModal(clickedEvent: any) {
    const event: ScheduleType = {
      userId: "",
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
    // Find the index of the edited event in the events array
    const index = events.findIndex((event) => event.id === formData.id);

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
      backgroundColor: "",
    });
  }

  function handleFormSubmit(formData: ScheduleType) {
    const start = moment(formData.start).format("YYYY-MM-DDTHH:mm:ss");
    const end = moment(formData.end).format("YYYY-MM-DDTHH:mm:ss");

    const event: ScheduleType = {
      ...formData,
      id: formData.id || uuidv4(), // Generate UUID if ID doesn't exist
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
