import React, { useState, useEffect } from "react";
import { ScheduleType } from "@/type/Schedule";
import {
  ModalWrapper,
  ModalContent,
  CloseButton,
  Form,
  FormGroup,
  IconWrapper,
  Input,
  Text,
  TextArea,
  SubmitButton,
  Title,
  EditButton,
  DeleteButton,
  DateInputWrapper,
  DateInput,
  ButtonContainer,
  TitleInput,
} from "./EventModalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChevronRight,
  faClock,
  faEdit,
  faNoteSticky,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { ScheduleType } from "@/type/Schedule";
interface EditModalProps {
  isOpen: boolean;
  event: ScheduleType;
  onClose: () => void;
  onDelete: () => void;
  onSubmit: (formData: ScheduleType) => void;
}

const EditModal = ({
  isOpen,
  event,
  onDelete,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert start and end to formatted strings if changed, otherwise keep as is
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
    
  // Handle event deletion
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

  if (!event) {
    return null;
  }

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
                <Title>
                  <TitleInput
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Title>
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faClock} />
                </IconWrapper>
                <DateInputWrapper>
                  <DateInput
                    type="date"
                    name="start"
                    value={moment(formData.start).format("YYYY-MM-DD")}
                    onChange={(e) => handleChange(e)}
                    disabled={!editMode}
                  />
                </DateInputWrapper>
                -
                <DateInputWrapper>
                  <DateInput
                    type="date"
                    name="end"
                    value={moment(formData.end).format("YYYY-MM-DD")}
                    onChange={(e) => handleChange(e)}
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
                  value={formData.participant}
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
                  value={formData.content}
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
