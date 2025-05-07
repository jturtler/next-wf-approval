"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SelectorPeriod from "./SelectorPeriod";
import SelectorLocation from "./SelectorLocation";

export default function Selectors() {

  const periods = useSelector((state: RootState) => state.dropdowns.periods);
  const selectedPeriod = useSelector((state: RootState) => state.dropdowns.selectedPeriod);

  return (
    <div className="bg-white shadow-sm p-2 flex flex-wrap items-center gap-4">
      <div className="flex gap-2 w-full flex-wrap">
        <SelectorPeriod/>

        <SelectorLocation/>

      </div>

    </div>
  );
}