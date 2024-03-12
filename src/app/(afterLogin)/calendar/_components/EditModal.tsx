import React, { useState, useEffect } from "react";
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
  DeleteButton,
  ButtonContainer,
  EditButton,
} from './EventModalStyles'
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

import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ScheduleType) => void;
  onDelete: () => void;
  event: ScheduleType;
  userId: string;
  id: string;
}

const EditModal = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete, 
  event,
  userId,
}: Props) => {
  const [formData, setFormData] = useState<ScheduleType>(event);
  const [editMode, setEditMode] = useState(false);

  // Updates form data when the event prop changes
  useEffect(() => {
    setFormData(event);
  }, [event]);

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
  const handleEdit = () => {
    setEditMode(true);
    console.log(formData);
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      // id: formData.id || uuidv4(), // Use the provided id or generate UUID
      textColor: formData.textColor || "black",
      borderColor: formData.borderColor || "#DEDEDE",
      backgroundColor: formData.backgroundColor || "", // Provide default value
    };
    console.log("Document ID to update:", event.id);
    if (event.id) { // Check if formData.id is defined
      const docRef = doc(db, "schedule", event.id);
      await updateDoc(docRef, updatedFormData);
    }

    onSubmit(updatedFormData);
    onClose();
  };
    
  // Handle event deletion
  const handleDelete = async () => {
    console.log(formData.id)
    if (formData.id) { // Check if formData.id is defined
      const docRef = doc(db, "schedule", formData.id);
      await deleteDoc(docRef);
      onDelete();
      onClose();
    }
    console.log(formData)
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
                  disabled={!editMode}
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
                    disabled={!editMode}
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
                    disabled={!editMode}
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
                  disabled={!editMode}
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
                  disabled={!editMode}
                />
              </FormGroup>
              <ButtonContainer>
                {editMode ? (
                  <SubmitButton type="submit">저장</SubmitButton>
                ) : (
                  <EditButton type="button" onClick={handleEdit}>
                    {/* <FontAwesomeIcon icon={faEdit} /> */}
                    수정
                  </EditButton>
                )}
                <DeleteButton type="button" onClick={handleDelete}>
                  {/* <FontAwesomeIcon icon={faTrash} /> */}
                  삭제
                </DeleteButton>
              </ButtonContainer>
            </Form>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default EditModal;
