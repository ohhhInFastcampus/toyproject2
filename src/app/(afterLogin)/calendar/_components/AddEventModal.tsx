import React, { useState } from "react";
import {
  ModalWrapper,
  ModalContent,
  CloseButton,
  Form,
  FormGroup,
  IconWrapper,
  TitleInput,
  Input,
  DateInput,
  TextArea,
  SubmitButton,
  eventColors,
  DateInputWrapper,
} from "./EventModalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUsers,
  faNoteSticky,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { ScheduleType } from "@/type/Schedule";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 function from uuid
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ScheduleType) => void;
  userId: string;
  id: string; // Change the id type to string
}

const EventModal = ({ isOpen, onClose, onSubmit, userId, id }: Props) => {
  const [formData, setFormData] = useState<ScheduleType>({
    userId: userId,
    id: id || uuidv4(), // Use the provided id or generate UUID id || uuidv4()
    title: "",
    start: moment().format("YYYY-MM-DDTHH:mm:ss"),
    end: moment().format("YYYY-MM-DDTHH:mm:ss"),
    content: "",
    participant: "",
    backgroundColor: "",
    textColor: "black",
    borderColor: "#DEDEDE",
  });

  // Updates the form data when input fields change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const randomIndex = Math.floor(Math.random() * eventColors.length);
    const randomColor = eventColors[randomIndex];
    const start = new Date(formData.start);
    const end = new Date(formData.end);
  
    const updatedFormData = {
      ...formData,
      backgroundColor: randomColor,
      start: moment(start).format(),
      end: moment(end).format(),
      textColor: "black",
      borderColor: "#DEDEDE",
    };
  
    try {
      // If formData.id exists, update the existing document
      if (formData.id) {
        const docRef = doc(db, "schedule", formData.id);
        await setDoc(docRef, updatedFormData); // Use setDoc for updating
        console.log("Updated event with ID:", formData.id);
        onSubmit(updatedFormData); // Call onSubmit with updated form data
        onClose(); // Close the modal
      } else {
        console.error("No ID found for event:", formData);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      // Handle error, maybe display a message to the user
    }
  };


  return (
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                </IconWrapper>
                <TitleInput
                  type="text"
                  name="title"
                  placeholder="제목"
                  value={formData.title}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faClock} />
                </IconWrapper>
                <DateInputWrapper>
                  <DateInput
                    type="datetime-local"
                    name="start"
                    value={moment(formData.start).format(
                      "YYYY-MM-DDTHH:mm:ss"
                    )}
                    onChange={handleChange}
                  />
                </DateInputWrapper>
                -
                <DateInputWrapper>
                  <DateInput
                    type="datetime-local"
                    name="end"
                    value={moment(formData.end).format(
                      "YYYY-MM-DDTHH:mm:ss"
                    )}
                    onChange={handleChange}
                  />
                </DateInputWrapper>
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faUsers} />
                </IconWrapper>
                <Input
                  type="text"
                  name="participant"
                  placeholder="참여자 추가하기"
                  value={formData.participant || ""}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faNoteSticky} />
                </IconWrapper>
                <TextArea
                  name="content"
                  placeholder="메모 추가하기"
                  value={formData.content || ""}
                  onChange={handleChange}
                />
              </FormGroup>
              <SubmitButton type="submit">저장</SubmitButton>
            </Form>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default EventModal;
