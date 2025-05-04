import Image from "next/image";

export default function Header() {

  // <!--img src={productImg} alt="product" className="w-6 h-6" /-->
  // <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />

  return (
    <div className="flex justify-between items-center bg-sky-800 text-white p-2">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">PSI DHIS2 Approval</h1>
        </div>

        <div className="flex items-center space-x-4">
            <span className="text-sm">JC</span>
            <div className="relative w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">J</div>
        </div>
    </div>
  );
}