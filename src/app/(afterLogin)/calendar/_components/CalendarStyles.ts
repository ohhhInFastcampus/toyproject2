import styled from "styled-components";

export const CalendarContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  .fc-toolbar {
    display: flex;
    align-items: center; /* Align items vertically */
    justify-content: space-between; /* Distribute space evenly between items */

    button {
      background-color: #f0f0f0;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px 16px;
      margin: 0 4px;
      cursor: pointer;
      display: flex-row;
      align-items: center; /* Center the icon vertically */
    }
    button:hover {
      background-color: #e0e0e0;
    }
  }

  .fc-today-button {
    font-size: 12px; /* Adjust font size to make the text smaller */
  }

  .fc-prev-button,
  .fc-next-button {
    font-size: 10px; 
  }

  .fc-dayGridMonth-button,
  .fc-timeGridWeek-button {
    font-size: 12px;
  }




.fc-event-time {
  display: none;
}
`;