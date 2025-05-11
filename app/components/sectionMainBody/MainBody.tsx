import Selectors from "../selectors/Selectors";
import DisplayDataList from "./DisplayDataList";

export default function MainBody() {
  return (
    <main>
      <Selectors />
      <div className="p-2">
        <DisplayDataList />
      </div>
    </main>
  );
}