import Image from "next/image";

export default function Selectors() {

  return (
    <div className="bg-white shadow-sm p-2 flex flex-wrap items-center gap-4">
      <div className="flex gap-2 w-full flex-wrap">
      <div>
          <label className="">Period</label>
          <select className="border p-1 rounded w-40 ml-1" data-testid="select-period" >
            <option value="" disabled>Select a Period</option>
          </select>
        </div>

        <div>
          <label className="">Location</label>
          <select className="border p-1 rounded w-40 ml-1" data-testid="select-location" >
            <option value="" disabled>Select a Location</option>
          </select>
        </div>

      </div>

    </div>
  );
}