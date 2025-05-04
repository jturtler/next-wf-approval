// filepath: c:\Users\Administrator\Documents\GitHub\next-try1\app\components\MainBody.tsx
import Image from "next/image";
import Selectors from "./Selectors";

export default function MainBody() {
  return (
    <main>
      <Selectors />
      <div className="p-2 ml-2">
        Main body
      </div>
    </main>
  );
}