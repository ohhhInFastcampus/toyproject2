import React, { useState } from "react";
import { ScheduleType } from "../../../type/Schedule";
import { ModalWrapper, ModalContent, CloseButton, Form, FormGroup, IconWrapper, InputWrapper, TitleInput, Input, DateInput, TextArea, SubmitButton, eventColors } from "./EventModalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUsers, faNoteSticky, faChevronRight, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ScheduleType) => void;
  newEvent: ScheduleType;
}

const EventModal = ({ isOpen, onClose, onSubmit, newEvent }: Props) => {
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

  // useEffect(() => {
  //   setFormData(newEvent); 
  // }, [newEvent]);

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
            </Form>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default EventModal;
