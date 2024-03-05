"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";

const RequestPage = () => {
  return (
    <div>
      <h2>정정신청 페이지</h2>
      <form>
        <label> 검토자</label>
        <Input id="reason" type="text" />
        <label>정정사유 </label>
        <select name="color">
          <option value="overtime">업무 연장 미반영</option>
          <option value="unpaid_leave">무급 휴가 사용 미반영</option>
          <option value="holiday_work">휴일 근무 미반영</option>
        </select>
        <Button type="button">닫기</Button>
        <Button type="submit">제출하기</Button>
      </form>
    </div>
  );
};
export default RequestPage;
