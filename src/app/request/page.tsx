"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import styled from "styled-components";

const StyledRequest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  gap: 20px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // 가운데 정렬
  gap: 20px;
  margin: 40px 0;
`;

const RequestPage = () => {
  return (
    <StyledRequest>
      <h2>정정신청 페이지</h2>
      <form>
        <div>
          <label htmlFor="reviewer">검토자:</label> <br />
          <StyledSelect id="reviewer" name="reviewer">
            <option value="manager">정지혜</option>
            <option value="CTO">helpdesku</option>
          </StyledSelect>
        </div>
        <div>
          <label htmlFor="reason">정정사유:</label>
          <br />
          <StyledSelect id="reason" name="reason">
            <option value="overtime">업무 연장 미반영</option>
            <option value="unpaid_leave">무급 휴가 사용 미반영</option>
            <option value="holiday_work">휴일 근무 미반영</option>
          </StyledSelect>
        </div>
        <ButtonContainer>
          <Button type="button">닫기</Button>
          <Button type="submit">제출하기</Button>
        </ButtonContainer>
      </form>
    </StyledRequest>
  );
};
export default RequestPage;
