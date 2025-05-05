"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPeriods } from "../redux/store";

import Footer from "./Footer";
import Header from "./Header";
import MainBody from "./MainBody";

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const periodsJson = await (await fetch("/data/periods.json")).json();
        dispatch(setPeriods(periodsJson));

      } catch (error) {
        console.error("Error fetching periodData:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Header />
      <MainBody />
      <Footer />
    </div>
  );
}