import React, { useState } from "react";
import { ScheduleType } from "../../../type/Schedule";
import styled from "styled-components";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ScheduleType) => void;
  newEvent: ScheduleType;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

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
            </Form>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default EventModal;
