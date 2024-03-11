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
import { collection, doc, setDoc } from "firebase/firestore";
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
  id,
}: Props) => {
  
  const [formData, setFormData] = useState<ScheduleType>(event);

  useEffect(() => {
    setFormData(event);
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFormData = { ...formData };
    onSubmit(updatedFormData);
    onClose();
    console.log("Edit Modal - Form Data:", formData); // Log the form data
  };
  console.log("Edit Modal - Event Data:", event);

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
            <SubmitButton onClick={onDelete}>삭제</SubmitButton>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default EditModal;
