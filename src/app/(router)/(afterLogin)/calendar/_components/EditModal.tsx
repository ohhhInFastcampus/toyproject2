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
  id,
  userId,
}: Props) => {
  const [formData, setFormData] = useState<ScheduleType>({
    userId: userId,
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    content: event.content,
    participant: event.participant,
    backgroundColor: event.backgroundColor,
    textColor: event.textColor,
    borderColor: event.borderColor,
  });
  const [editMode, setEditMode] = useState(false);

  // Updates form data when the event prop changes
  useEffect(() => {
    setFormData({
      userId: userId,
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      content: event.content,
      participant: event.participant,
      backgroundColor: event.backgroundColor,
      textColor: event.textColor,
      borderColor: event.borderColor,
    });
  }, [event, userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Convert start and end values to Date objects if they are changed
    const updatedValue = name === "start" || name === "end" ? moment(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };
  const handleEdit = () => {
    setEditMode(true);
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      textColor: formData.textColor || "black",
      borderColor: formData.borderColor || "#DEDEDE",
      backgroundColor: formData.backgroundColor || "", // Provide default value
      start: moment(formData.start).isValid() ? moment(formData.start).format("YYYY-MM-DDTHH:mm:ss") : formData.start,
      end: moment(formData.end).isValid() ? moment(formData.end).format("YYYY-MM-DDTHH:mm:ss") : formData.end,
    };

    console.log("Document ID to update:", event.id);
    try {
      if (formData.id) {
        const docRef = doc(db, "schedule", formData.id);
        await updateDoc(docRef, updatedFormData);

        onSubmit(updatedFormData);
        setEditMode(false);
        onClose();
      } else {
        console.error("No ID found for event:", formData);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
    
  const handleDelete = async () => {
    try {
      if (formData.id) {
        const docRef = doc(db, "schedule", formData.id);
        await deleteDoc(docRef);

        onDelete();
        onClose();
      } else {
        console.error("No ID found for event:", formData);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
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
                    수정
                  </EditButton>
                )}
                <DeleteButton type="button" onClick={handleDelete}>
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
