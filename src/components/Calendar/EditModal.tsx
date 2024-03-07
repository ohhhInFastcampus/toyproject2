import React, { useState, useEffect } from "react";
import { ScheduleType } from "../../../type/Schedule";
import { ModalWrapper, ModalContent, CloseButton, Form, FormGroup, IconWrapper, Input, Text, TextArea, SubmitButton, Title, EditButton, DeleteButton } from "./EventModalStyles";
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
    backgroundColor: event.backgroundColor || "", // Set a default value or handle the absence of backgroundColor
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

  const handleEdit = () => {
    setEditMode(true);
    // console.log(formData)
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
                <Input
                  type="date"
                  name="start"
                  value={moment(formData.start).format('YYYY-MM-DD')}
                  onChange={(e) => handleChange(e)}
                  disabled={!editMode}
                />
                <IconWrapper>
                  <FontAwesomeIcon icon={faChevronRight} />
                </IconWrapper>
                <Input
                  type="date"
                  name="end"
                  value={moment(formData.end).format('YYYY-MM-DD')}
                  onChange={(e) => handleChange(e)}
                  disabled={!editMode}
                />
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
              <DeleteButton type="button" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                  삭제
              </DeleteButton>
              {editMode ? (
                <SubmitButton type="submit">저장</SubmitButton>
              ) : (
                <EditButton type="button" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faEdit} />
                  수정
                </EditButton>
              )}
            </Form>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default EditModal;



// import React, { useState, useEffect } from 'react';
// import moment from 'moment'; 
// import { ScheduleType } from '../../../type/Schedule';
// import { ModalWrapper, ModalContent, CloseButton, Form, FormGroup, IconWrapper, Input, Text, TextArea, SubmitButton, Title, EditButton, DeleteButton } from "./EventModalStyles";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarCheck, faChevronRight, faClock, faEdit, faNoteSticky, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';

// interface EditModalProps {
//   isOpen: boolean;
//   event: ScheduleType;
//   onClose: () => void;
//   onDelete: () => void;
//   onSubmit: (formData: ScheduleType) => void;
// }

// const EditModal = ({ isOpen, event, onDelete, onClose, onSubmit }: EditModalProps) => {
//   const [formData, setFormData] = useState<ScheduleType>({
//     userId: "",
//     id: "",
//     title: "",
//     start: "",
//     end: "",
//     content: "",
//     participant: "",
//     backgroundColor: event.backgroundColor || "", // Set a default value or handle the absence of backgroundColor
//   });
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     setFormData(event); 
//   }, [event]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const updatedFormData = {
//       ...formData,
//       backgroundColor: event.backgroundColor, // Preserve the color
//       textColor: 'black',
//       borderColor: '#DEDEDE'
//     };
//     onSubmit(updatedFormData);
//     onClose();
//     console.log(updatedFormData)
//   };

//   const handleEdit = () => {
//     setEditMode(true);
//     // console.log(formData)
//   };

//   const handleDelete = () => {
//     onDelete()
//   }

//   if (!event) {
//     return null;
//   }

//   return (
//     <>
//       {isOpen && (
//         <ModalWrapper>
//           <ModalContent>
//             <CloseButton onClick={onClose}>&times;</CloseButton>
//             <Form onSubmit={handleSubmit}>
//               <FormGroup>
//                 <IconWrapper>
//                   <FontAwesomeIcon icon={faCalendarCheck} />
//                 </IconWrapper>
//                 <Title>
//                   {editMode ? (
//                     <Input type="text" name="title" value={formData.title} onChange={handleChange} />
//                   ) : (
//                     event.title
//                   )}
//                 </Title>
//               </FormGroup>
//               <FormGroup>
//                 <IconWrapper>
//                   <FontAwesomeIcon icon={faClock} />
//                 </IconWrapper>
//                 <Text>{moment(event.start).format('ddd MMM DD ')}</Text>
//                 <IconWrapper>
//                   <FontAwesomeIcon icon={faChevronRight} />
//                 </IconWrapper>
//                 <Text>{moment(event.end).format('ddd MMM DD ')}</Text>
//               </FormGroup>
//               <FormGroup>
//                 <IconWrapper>
//                   <FontAwesomeIcon icon={faUsers} />
//                 </IconWrapper>
//                 <Input
//                   type="text"
//                   name="participant"
//                   value={formData.participant}
//                   onChange={handleChange}
//                   disabled={!editMode}
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <IconWrapper>
//                   <FontAwesomeIcon icon={faNoteSticky} />
//                 </IconWrapper>
//                 <TextArea
//                   name="content"
//                   value={formData.content}
//                   onChange={handleChange}
//                   disabled={!editMode}
//                 />
//               </FormGroup>
//               <DeleteButton type="button" onClick={handleDelete}>
//                   <FontAwesomeIcon icon={faTrash} />
//                   삭제
//               </DeleteButton>
//               {editMode ? (
//                 <SubmitButton type="submit">저장</SubmitButton>
//               ) : (
//                 <EditButton type="button" onClick={handleEdit}>
//                   <FontAwesomeIcon icon={faEdit} />
//                   수정
//                 </EditButton>
//               )}
//             </Form>
//           </ModalContent>
//         </ModalWrapper>
//       )}
//     </>
//   );
// };

// export default EditModal;


