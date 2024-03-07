import React, { useState, useEffect } from 'react';
import moment from 'moment'; 
import { ScheduleType } from '../../../type/Schedule';
import { ModalWrapper, ModalContent, CloseButton, Form, Text, FormGroup, IconWrapper, InputWrapper, TitleInput, Input, DateInput, TextArea, SubmitButton, Title } from "./EventModalStyles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faChevronRight, faClock, faEdit, faNoteSticky, faUsers } from '@fortawesome/free-solid-svg-icons';

interface EditModalProps {
  isOpen: boolean;
  event: ScheduleType;
  onClose: () => void;
  onSubmit: (formData: ScheduleType) => void;
}

const EditModal = ({ isOpen, event, onClose, onSubmit }: EditModalProps) => {

  const [formData, setFormData] = useState<ScheduleType>(event);
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
    onSubmit(formData);
    onClose();
  };

  const handleEdit = () => {
    setEditMode(true);
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
                <Title>{event.title}</Title>
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faClock} />
                </IconWrapper>
                <InputWrapper>
                  <Text>{moment(event.start).format('ddd MMM DD ')}</Text>
                </InputWrapper>
                <IconWrapper>
                  <FontAwesomeIcon icon={faChevronRight} />
                </IconWrapper>
                <InputWrapper>
                  <Text>{moment(event.end).format('ddd MMM DD ')}</Text>
                </InputWrapper>
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faUsers} />
                </IconWrapper>
                <Text>{event.participant}</Text>
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faNoteSticky} />
                </IconWrapper>
                <Text>{event.content}</Text>
              </FormGroup>
              {/* <SubmitButton type="submit">수정</SubmitButton> */}
              {editMode ? (
              <SubmitButton onClick={handleSubmit}>Save Changes</SubmitButton>
            ) : (
              <SubmitButton onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
                Edit
              </SubmitButton>
            )}
            </Form>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default EditModal;
