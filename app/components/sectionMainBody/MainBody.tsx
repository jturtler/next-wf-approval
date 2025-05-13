import Selectors from "../selectors/Selectors";
import DataListDisplay from "./DataListDisplay";

export default function MainBody() {
  return (
    <main>
      <Selectors />
      <div className="p-2">
        <DataListDisplay />
      </div>
    </main>
  );
}