import Image from "next/image";
import styles from "./page.module.css";
import Calendar from "@/components/Calendar/Calendar";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <Calendar />
    </>
  );
}
