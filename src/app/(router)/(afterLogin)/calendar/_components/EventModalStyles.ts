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
  position: relative;
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
  width: 30px;
  text-align: center;
  margin-right: 10px;
`;

export const InputWrapper = styled.div`
  flex: 1;
  margin-right: 10px;
`;
export const DateInputWrapper = styled.div`
  flex: 1;
  // margin-right: 10px;
`;

const commonInputStyles = `
  padding: 10px 8px;
  border: none;
  border-bottom: 1px solid #ddd;
  border-radius: 0;
  transition: border-color 0.3s;
  width: 100%; 
  margin-left: 15px;
  margin-right: 15px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #333;
  }
`;

export const TitleInput = styled.input`
  ${commonInputStyles}
  font-size: 22px; 
  width: 300px;
  margin: 0 15px;
  background-color: transparent; 
`;

export const Input = styled.input`
  ${commonInputStyles}
  font-size: 13px;
  border: none;
  border-bottom: 1px solid transparent; 
  background-color: transparent; 
`;

export const DateInput = styled.input`
  ${commonInputStyles}
  width: 128px;
  font-size: 13px;
  border: none;
  border-bottom: 1px solid transparent; 
  background-color: transparent; 
`;


export const TextArea = styled.textarea`
  padding: 10px 8px;
  border: 1px solid transparent; 
  border-radius: 4px;
  width: 100%;
  font-size: 13px;
  margin-left: 15px;
  margin-right: 15px;
  background-color: transparent; 
  &:focus {
    outline: none;
    border: 1px solid #333;
  }
`;

const commonButtonStyles = `
  padding: 10px 0;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
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
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

export const SubmitButton = styled.button`
  ${commonButtonStyles}
`;

export const EditButton = styled.button`
  ${commonButtonStyles}
`;

export const DeleteButton = styled.button`
  ${commonButtonStyles}
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end
`;

export const eventColors = [
  '#FFADAD', 
  '#FFD6A5', 
  '#FFFFB6', 
  '#E4F1EE', 
  '#D9EDF8', 
  '#DEDAF4'
];

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

export const Text = styled.span`
  padding: 10px 8px;
  transition: border-color 0.3s;
  font-size: 14px;
  width: 100%; 
  margin-left: 15px;
  margin-right: 15px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #333;
  }
`;

export const Title = styled.h2`
  padding: 10px 8px;
  font-size: 22px; 
  width: 100%; 
  margin-left: 10px;
  margin-right: 15px;
  border-bottom: 1px solid transparent; 
  background-color: transparent; 
  &:hover {
    color: #333;
  }
`;