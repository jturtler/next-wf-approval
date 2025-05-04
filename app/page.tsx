import Image from "next/image";
import Header from "./components/Header";
import MainBody from "./components/MainBody";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Header />
      <MainBody />
      <Footer />
    </div>
  );
}
