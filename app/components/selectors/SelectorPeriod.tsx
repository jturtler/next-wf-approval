"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, setSelectedItemId, setSelectedPeriod } from "../../redux/store";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function SelectorPeriod() {
  const dispatch = useDispatch();

  const periods = useSelector((state: RootState) => state.dropdowns.periods);
  const selectedPeriod = useSelector((state: RootState) => state.dropdowns.selectedPeriod);

  const onChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedPeriod(e.target.value));
    dispatch(setSelectedItemId("")); // Clear selected items when location changes
  }

  const clearSelection = () => {
    dispatch(setSelectedPeriod(""));
    dispatch(setSelectedItemId("")); // Clear selected items when location changes
  };

  return (
    <div className="flex flex-nowrap items-center">
      <label className="">Period</label>
      <select className="border p-1 rounded w-40 ml-1" data-testid="select-period" 
        value={selectedPeriod || ""}
        onChange={(e) => onChangePeriod(e)}>
        <option value="" disabled>Select a Period</option>
        {periods.map((period) => (
          <option key={period.id} value={period.id}>
            {period.name}
          </option>
        ))}
      </select>
      {selectedPeriod && (
        <IoIosCloseCircleOutline size={20} className="ml-1 font-bold text-gray-500 hover:text-red-400 cursor-pointer"
        onClick={clearSelection}
        aria-label="Clear selection"/>
      )}
    </div>
  );
}