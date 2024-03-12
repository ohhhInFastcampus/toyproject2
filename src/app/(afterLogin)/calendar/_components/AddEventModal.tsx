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

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
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
    id: id, // Use the provided id or generate UUID id || uuidv4()
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
      id: formData.id,
      backgroundColor: randomColor,
      start: moment(start).format(),
      end: moment(end).format(),
      textColor: "black",
      borderColor: "#DEDEDE",
    };
    console.log(formData.id)
    try {
      // Save event to Firestore with Firestore-generated ID
      const docRef = await addDoc(collection(db, "schedule"), updatedFormData);
      const newEvent = { ...updatedFormData, id: docRef.id };

      console.log("added event:", newEvent);

      onSubmit(newEvent); // Call onSubmit with newEvent including Firestore ID
      setFormData({
        userId: userId,
        id: '',
        title: "",
        start: moment().format("YYYY-MM-DDTHH:mm:ss"),
        end: moment().format("YYYY-MM-DDTHH:mm:ss"),
        content: "",
        participant: "",
        backgroundColor: "",
        textColor: "black",
        borderColor: "#DEDEDE",
      });
      
      onClose();
    } catch (error) {
      console.error("Error adding new event:", error);
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
