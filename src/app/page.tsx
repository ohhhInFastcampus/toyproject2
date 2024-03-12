import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/header";
import Calendar from "@/app/(afterLogin)/calendar/page";

export default function Home() {
  return (
    <>
      <Header />
      <Calendar />
    </>
  );
}
