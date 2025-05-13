import { useSelector } from "react-redux";
import Selectors from "../selectors/Selectors";
import DataListDisplay from "./DataListDisplay";
import { RootState } from "../../redux/store";
import DataEntry from "./DataEntry";

export default function MainBody() {

  const isDataEntry = useSelector((state: RootState) => state.dropdowns.isDataEntry);

  return (
    <main>
      <Selectors />
      <div className="p-2">
        { ( isDataEntry ) ? <DataEntry /> : <DataListDisplay />}
      </div>
    </main>
  );
}