import React, { useState, useEffect } from "react";
import { ScheduleType } from "@/../type/Schedule";
import { ModalWrapper, ModalContent, CloseButton, Form, FormGroup, IconWrapper, Input, Text, TextArea, SubmitButton, Title, EditButton, DeleteButton, DateInputWrapper, DateInput, ButtonContainer, TitleInput } from "./EventModalStyles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faChevronRight, faClock, faEdit, faNoteSticky, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";

interface EditModalProps {
  isOpen: boolean;
  event: ScheduleType;
  onClose: () => void;
  onDelete: () => void;
  onSubmit: (formData: ScheduleType) => void;
}

const EditModal = ({ isOpen, event, onDelete, onClose, onSubmit }: EditModalProps) => {
  const [formData, setFormData] = useState<ScheduleType>({
    userId: "",
    id: "",
    title: "",
    start: "",
    end: "",
    content: "",
    participant: "",
    backgroundColor: event.backgroundColor || "", 
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setFormData(event); 
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      backgroundColor: event.backgroundColor, // Preserve the color
      textColor: 'black',
      borderColor: '#DEDEDE'
    };
    onSubmit(updatedFormData);
    onClose();
    console.log(updatedFormData)
  };

  // 수정 모드 활성화 
  const handleEdit = () => {
    setEditMode(true);
    console.log(formData)
  };

  const handleDelete = () => {
    onDelete()
  }

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
                  disabled={!editMode} />
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
                    value={moment(formData.start).format('YYYY-MM-DD')}
                    onChange={(e) => handleChange(e)}
                    disabled={!editMode}
                  />
                </DateInputWrapper>
                -
                <DateInputWrapper>
                  <DateInput
                    type="date"
                    name="end"
                    value={moment(formData.end).format('YYYY-MM-DD')}
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