import React, { useState, useEffect } from 'react';
import moment from 'moment'; 
import { ScheduleType } from '../../../type/Schedule';
import { ModalWrapper, ModalContent, CloseButton, Form, FormGroup, IconWrapper, Input, Text, TextArea, SubmitButton, Title } from "./EventModalStyles";
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
    console.log(formData)
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
                  {editMode ? (
                    <Input type="text" name="title" value={formData.title} onChange={handleChange} />
                  ) : (
                    event.title
                  )}
                </Title>
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faClock} />
                </IconWrapper>
                <Text>{moment(event.start).format('ddd MMM DD ')}</Text>
                <IconWrapper>
                  <FontAwesomeIcon icon={faChevronRight} />
                </IconWrapper>
                <Text>{moment(event.end).format('ddd MMM DD ')}</Text>
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
              {editMode ? (
                <SubmitButton type="submit">Save Changes</SubmitButton>
              ) : (
                <SubmitButton type="button" onClick={handleEdit}>
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
