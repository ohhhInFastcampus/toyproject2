import React, { useState } from "react";
import { ScheduleType } from "../../../type/Schedule";
<<<<<<< HEAD
import styled from "styled-components";
=======
import { ModalWrapper, ModalContent, CloseButton, Form, FormGroup, IconWrapper, InputWrapper, TitleInput, Input, DateInput, TextArea, SubmitButton, eventColors } from "./EventModalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUsers, faNoteSticky, faChevronRight, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
>>>>>>> 36deb3c5f84ec9ffc55585c28bb42b8954d8e3a4

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ScheduleType) => void;
  newEvent: ScheduleType;
}

  const EventModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, newEvent }) => {
    const [formData, setFormData] = useState<ScheduleType>({
      userId: "",
      id: "",
      title: "",
      start: "",
      end: "",
      content: "",
      participant: "",
      backgroundColor: ""
    });

<<<<<<< HEAD
const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative; /* Ensure close button is positioned relative to the modal content */
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EventModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  newEvent,
}) => {
  const [formData, setFormData] = useState<ScheduleType>({
    userId: "",
    id: "",
    title: "",
    start: "",
    end: "",
    content: "",
    participant: "",
  });

=======
>>>>>>> 36deb3c5f84ec9ffc55585c28bb42b8954d8e3a4
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
<<<<<<< HEAD
    onSubmit(formData);
    onClose();
=======
    
    // 이벤트 색상 랜덤 선택
    const randomIndex = Math.floor(Math.random() * eventColors.length);
    const randomColor = eventColors[randomIndex];
    const start = new Date(formData.start);
    const end = new Date(formData.end);
  
    const updatedFormData = {
      ...formData,
      backgroundColor: randomColor,
      start: start.toISOString(),
      end: end.toISOString(),
      textColor: 'black',
      borderColor: '#DEDEDE'
    };
    setFormData(updatedFormData);
    onSubmit(updatedFormData);
    onClose();
    console.log(formData)
>>>>>>> 36deb3c5f84ec9ffc55585c28bb42b8954d8e3a4
  };
  
  return (
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <Form onSubmit={handleSubmit}>
<<<<<<< HEAD
              <Label>Title:</Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <Label>Start Date:</Label>
              <Input
                type="date"
                name="start"
                value={formData.start}
                onChange={handleChange}
              />
              <Label>End Date:</Label>
              <Input
                type="date"
                name="end"
                value={formData.end}
                onChange={handleChange}
              />
              <Label>Content:</Label>
              <TextArea
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
              <Label>Participant:</Label>
              <Input
                type="text"
                name="participant"
                value={formData.participant}
                onChange={handleChange}
              />
              <SubmitButton type="submit">Submit</SubmitButton>
=======
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                </IconWrapper>
                <TitleInput
                  type="text"
                  name="title"
                  placeholder="일정 추가하기"
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
                    type="date"
                    name="start"
                    value={formData.start}
                    onChange={handleChange}
                  />
                </InputWrapper>
                <IconWrapper>
                  <FontAwesomeIcon icon={faChevronRight} />
                </IconWrapper>
                <InputWrapper>
                  <DateInput
                    type="date"
                    name="end"
                    value={formData.end}
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
                  placeholder="참여자 추가하기"
                  value={formData.participant || ''}
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
                  value={formData.content || ''}
                  onChange={handleChange}
                />
              </FormGroup>
              <SubmitButton type="submit">저장</SubmitButton>
>>>>>>> 36deb3c5f84ec9ffc55585c28bb42b8954d8e3a4
            </Form>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default EventModal;
