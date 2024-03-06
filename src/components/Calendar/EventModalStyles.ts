import styled from "styled-components";

export const ModalWrapper = styled.div`
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

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* Ensure close button is positioned relative to the modal content */
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #888;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const IconWrapper = styled.div`
  width: 30px; /* Adjust width as needed */
  text-align: center;
`;

export const InputWrapper = styled.div`
  flex: 1;
  // margin-left: 20px;
  margin-right: 15px;
`;

export const TitleInput = styled.input`
padding: 10px 8px;
border: none;
border-bottom: 1px solid #ddd;
border-radius: 0;
transition: border-color 0.3s;
font-size: 22px;
width: 100%; 
margin-left: 15px;
margin-right: 15px;
&:focus {
  outline: none;
  border-bottom: 1px solid #333;
}
`;

export const Input = styled.input`
padding: 10px 8px;
border: none;
border-bottom: 1px solid #ddd;
border-radius: 0;
transition: border-color 0.3s;
font-size: 13px;
width: 100%; 
margin-left: 15px;
margin-right: 15px;
&:focus {
  outline: none;
  border-bottom: 1px solid #333;
}
`;

export const DateInput = styled.input`
  padding: 10px 8px;
  border: none;
  border-bottom: 1px solid #ddd;
  border-radius: 0;
  transition: border-color 0.3s;
  font-size: 13px;
  width: 125px; /* Adjust width to make it smaller */
  margin-left: 15px ;
  &:focus {
    outline: none;
    border-bottom: 1px solid #333;
  }
`;


export const TextArea = styled.textarea`
  padding: 10px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  font-size: 13px;
  margin-left: 15px;
  margin-right: 15px;
  &:focus {
    outline: none;
    border: 1px solid #333;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 0;
  background-color: #f0f0f0; /* Light background color */
  color: #333; /* Text color */
  border: 1px solid #ccc; /* Border color */
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  width: 100px;
  margin-top: 5px;
  margin-right: 15px;
  transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s; 
  align-self: flex-end;
  &:hover {
    background-color: #e0e0e0; 
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1); /* Add subtle focus outline */
  }
`;
export const eventColors = [
  '#FFADAD', 
  '#FFD6A5', 
  '#FFFFB6', 
  '#E4F1EE', 
  '#D9EDF8', 
  '#DEDAF4'
];