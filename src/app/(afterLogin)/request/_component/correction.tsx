"use client";
import Button from "@/components/Button";
import { useState } from "react";
import styled from "styled-components";
import Textarea from "@/components/Textarea";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { RequestType } from "@/type/Request";

const StyledRequest = styled.div`
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

const Correction = () => {
  const [month, setMonth] = useState("");
  const [approver, setApprover] = useState("");
  const [reason, setReason] = useState("");
  const [text, setText] = useState("");
  const [submissions, setSubmissions] = useState<RequestType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "month") {
      setMonth(e.target.value);
    } else if (e.target.name === "approver") {
      setApprover(e.target.value);
    } else if (e.target.name === "reason") {
      setReason(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const docRef = doc(collection(db, "requests"));
    await setDoc(docRef, {
      month,
      approver,
      reason,
      text,
    });
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
                <option value="1월">1월</option>
                <option value="2월">2월</option>
                <option value="3월">3월</option>
                <option value="4월">4월</option>
                <option value="5월">5월</option>
                <option value="6월">6월</option>
                <option value="7월">7월</option>
                <option value="8월">8월</option>
                <option value="9월">9월</option>
                <option value="10월">10월</option>
                <option value="11월">11월</option>
                <option value="12월">12월</option>
              </optgroup>
            </StyledSelect>
          </div>
          <div>
            <label htmlFor="approver">결재자</label>
            <StyledSelect id="approver" name="approver" onChange={handleChange}>
              <option value="">선택해주세요</option>
              <optgroup>
                <option value="정지혜">정지혜</option>
                <option value="helpdesku">helpdesku</option>
              </optgroup>
            </StyledSelect>
          </div>
          <div>
            <label htmlFor="reason">정정 사유</label>
            <StyledSelect id="reason" name="reason" onChange={handleChange}>
              <option value="">선택해주세요</option>
              <optgroup>
                <option value="업무 연장 미반영">업무 연장 미반영</option>
                <option value="무급 휴가 사용 미반영">
                  무급 휴가 사용 미반영
                </option>
                <option value="휴일 근무 미반영">휴일 근무 미반영</option>
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
export default Correction;
