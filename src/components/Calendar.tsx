// Calendar.tsx
"use client"
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'

const Calendar = () => {
    return (
        <div>
            <h1>My Calendar</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={[
                    { title: 'Event 1', date: '2024-03-05' },
                    { title: 'Event 2', date: '2024-03-07' }
                    // Add more events as needed
                ]}
            />
        </div>
    );
};

export default Calendar;
