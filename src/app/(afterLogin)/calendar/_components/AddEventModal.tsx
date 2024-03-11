import React, { useState } from "react";
import {
  ModalWrapper,
  ModalContent,
  CloseButton,
  Form,
  FormGroup,
  IconWrapper,
  InputWrapper,
  TitleInput,
  Input,
  DateInput,
  TextArea,
  SubmitButton,
  eventColors,
  DateInputWrapper,
} from "./EventModalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUsers,
  faNoteSticky,
  faChevronRight,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { ScheduleType } from "@/type/Schedule";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ScheduleType) => void;
  newEvent: ScheduleType;
}

const EventModal = ({ isOpen, onClose, onSubmit, newEvent }: Props) => {
  const email = useSelector((state: RootState) => state.auth.email);
  const [formData, setFormData] = useState<ScheduleType>({
    userId: email ?? "",
    id: "",
    title: "",
    start: moment().format("YYYY-MM-DD"), // 오늘 날짜로 초기화
    end: moment().format("YYYY-MM-DD"),
    content: "",
    participant: "",
    backgroundColor: "",
  });

  // 입력 값 변경 처리
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 이벤트 색상 랜덤 선택
    const randomIndex = Math.floor(Math.random() * eventColors.length);
    const randomColor = eventColors[randomIndex];
    const start = new Date(formData.start);
    const end = new Date(formData.end);

    const updatedFormData = {
      ...formData,
      backgroundColor: randomColor,
      start: moment(start).format(),
      end: moment(end).format(),
      textColor: "black",
      borderColor: "#DEDEDE",
    };
    setFormData(updatedFormData);
    onSubmit(updatedFormData);
    onClose();
    console.log(updatedFormData);
    const docRef = doc(collection(db, "schedule"));
    await setDoc(docRef, {
      userId: updatedFormData.userId,
      id: updatedFormData.id,
      title: updatedFormData.title,
      start: updatedFormData.start,
      end: updatedFormData.end,
      content: updatedFormData.content,
      participant: updatedFormData.participant,
      backgroundColor: updatedFormData.backgroundColor,
    });
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
                />
              </FormGroup>
              <FormGroup>
                <IconWrapper>
                  <FontAwesomeIcon icon={faClock} />
                </IconWrapper>
                <DateInputWrapper>
                  <DateInput
                    type="date"
                    name="start"
                    value={formData.start}
                    onChange={handleChange}
                  />
                </DateInputWrapper>
                -
                <DateInputWrapper>
                  <DateInput
                    type="date"
                    name="end"
                    value={formData.end}
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
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default EventModal;
