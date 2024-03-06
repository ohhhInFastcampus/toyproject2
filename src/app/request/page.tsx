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
  const [month, setMonth] = useState("");
  const [approver, setApprover] = useState("");
  const [reason, setReason] = useState("");
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "month") {
      setMonth(e.target.value);
    } else if (e.target.name === "approver") {
      setApprover(e.target.value);
    } else if (e.target.name === "reason") {
      setReason(e.target.value);
    }
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    //TODO console.log 지우고 서버로 보내는 방식으로 처리
    console.log({ month, approver, reason, text });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <StyledRequest>
        <h2>정정 신청 페이지</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="month">급여 내역</label>
            <StyledSelect id="month" name="month" onChange={handleChange}>
              <option value="">선택해주세요</option>
              <optgroup>
                <option value="jan">1월</option>
                <option value="feb">2월</option>
                <option value="mar">3월</option>
                <option value="apr">4월</option>
                <option value="may">5월</option>
                <option value="jun">6월</option>
                <option value="jul">7월</option>
                <option value="aug">8월</option>
                <option value="sep">9월</option>
                <option value="oct">10월</option>
                <option value="nov">11월</option>
                <option value="dec">12월</option>
              </optgroup>
            </StyledSelect>
          </div>
          <div>
            <label htmlFor="approver">결재자</label>
            <StyledSelect id="approver" name="approver" onChange={handleChange}>
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
          <Textarea
            name="text"
            setText={setText}
            placeholder="요청 사항을 입력해주세요."
          />
          <Button type="submit">제출하기</Button>
        </form>
      </StyledRequest>
    </div>
  );
};
export default RequestPage;
