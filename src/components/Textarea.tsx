import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 20px 0;
`;

interface TextareaType {
  text: string;
  setText: (value: string) => void;
}

const Textarea = ({ text, setText }: TextareaType) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <StyledTextarea cols={30} rows={10} value={text} onChange={handleChange} />
  );
};

export default Textarea;
