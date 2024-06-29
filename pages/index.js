import Image from "next/image";
import { Inter } from "next/font/google";
import ContactForm from "../components/contact-form";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="">
      <Header />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <ContactForm />
      </main>
    </div>
  );
}
