import React, { useState, useEffect } from 'react';
import { ScheduleType } from '../../../type/Schedule';
import { ModalWrapper, ModalContent, CloseButton, Form, FormGroup, IconWrapper, InputWrapper, TitleInput, Input, DateInput, TextArea, SubmitButton } from "./EventModalStyles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faChevronRight, faClock, faNoteSticky, faUsers } from '@fortawesome/free-solid-svg-icons';

interface EditModalProps {
  isOpen: boolean;
  event: ScheduleType;
  onClose: () => void;
  onSubmit: (formData: ScheduleType) => void;
}

const EditModal = ({ isOpen, event, onClose, onSubmit }: EditModalProps) => {

  const [formData, setFormData] = useState<ScheduleType>(event);


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
                  value={formData.title}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faClock} />
                </IconWrapper>
                <InputWrapper>
                  <DateInput
                    type="text"
                    name="start"
                    value={new Date(formData.start).toDateString()}
                    onChange={handleChange}
                  />
                </InputWrapper>
                <IconWrapper>
                  <FontAwesomeIcon icon={faChevronRight} />
                </IconWrapper>
                <InputWrapper>
                  <DateInput
                    type="text"
                    name="end"
                    value={new Date(formData.end).toDateString()}
                    onChange={handleChange}
                  />
                </InputWrapper>
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
                />
              </FormGroup>
              <SubmitButton type="submit">수정</SubmitButton>
            </Form>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default EditModal;
