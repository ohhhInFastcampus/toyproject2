"use client";
import Button from "@/components/Button";
import { useState } from "react";
import styled from "styled-components";
import Textarea from "../../components/Textarea";

const StyledRequest = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 80px;
  gap: 60px;
  border: 1px solid #555;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  &:hover {
    border-color: #888;
  }
  &:focus {
    outline: none;
    border-color: #555;
  }
`;

const RequestPage = () => {
  const [option, setOption] = useState("");
  const [text, setText] = useState("요청 사항을 입력해주세요.");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <StyledRequest>
        <h2>정정 신청 페이지</h2>
        <form>
          <div>
            <label htmlFor="reviewer">결재자</label>
            <StyledSelect id="reviewer" name="reviewer" onChange={handleChange}>
              <option value="">선택해주세요</option>
              <optgroup>
                <option value="manager">정지혜</option>
                <option value="CTO">helpdesku</option>
              </optgroup>
            </StyledSelect>
          </div>
          <div>
            <label htmlFor="reason">정정 사유</label>
            <StyledSelect id="reason" name="reason" onChange={handleChange}>
              <option value="">선택해주세요</option>
              <optgroup>
                <option value="overtime">업무 연장 미반영</option>
                <option value="unpaid_leave">무급 휴가 사용 미반영</option>
                <option value="holiday_work">휴일 근무 미반영</option>
              </optgroup>
            </StyledSelect>
          </div>
          <label htmlFor="memo">요청사항</label>
          <br />
          <Textarea text={text} setText={setText} />
          <Button type="submit">제출하기</Button>
        </form>
      </StyledRequest>
    </div>
  );
};
export default RequestPage;
