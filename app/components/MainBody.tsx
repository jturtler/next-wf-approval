import Selectors from "./selectors/Selectors";
import DisplayDataList from "./mainBody/DisplayDataList";

export default function MainBody() {
  return (
    <main>
      <Selectors />
      <div className="p-2 ml-2">
        <DisplayDataList />
      </div>
    </main>
  );
}