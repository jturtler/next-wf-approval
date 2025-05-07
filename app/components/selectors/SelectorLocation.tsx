"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, setSelectedLocation } from "../../redux/store";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function SelectorLocation() {
  const dispatch = useDispatch();

  const locations = useSelector((state: RootState) => state.dropdowns.locations);
  const selectedLocation = useSelector((state: RootState) => state.dropdowns.selectedLocation);

  const onChangeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedLocation(e.target.value));
  }

  const clearSelection = () => {
    dispatch(setSelectedLocation(""));
  };

  return (
    <div className="flex flex-nowrap items-center">
      <label className="">Location</label>
      <select className="border p-1 rounded w-40 ml-1" data-testid="select-location" 
        value={selectedLocation || ""}
        onChange={(e) => onChangeLocation(e)}>
        <option value="" disabled>Select a Location</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      {selectedLocation && (
        <IoIosCloseCircleOutline size={20} className="ml-1 font-bold text-gray-500 hover:text-red-400 cursor-pointer"
        onClick={clearSelection}
        aria-label="Clear selection"/>
      )}
    </div>
  );
}