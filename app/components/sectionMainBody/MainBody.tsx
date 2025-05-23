import { useDispatch, useSelector } from "react-redux";
import Selectors from "../selectors/Selectors";
import DataCheckItems from "./DataCheckItems";
import { RootState, toggleDataEntry } from "../../redux/store";
import DataEntry from "./DataEntry";
import Modal from "../common/Modal";

export default function MainBody() {

  const isDataEntry = useSelector((state: RootState) => state.dropdowns.isDataEntry);

  const dispatch = useDispatch();
  
  const toggleDataEntryClick = () => {
    dispatch(toggleDataEntry());
  };

  return (
    <main>
      <Selectors />
      <div className="p-2">
        { ( !isDataEntry ) ? <DataCheckItems />
        : <Modal isVisible={isDataEntry}>
            <div className="bg-white rounded shadow-lg p-1 mx-2 min-w-[300px] relative">
              <button
                className="absolute top-1 right-1 text-gray-500 font-bold hover:text-red-500 text-3xl"
                onClick={toggleDataEntryClick}
                aria-label="Close"
              >
                &times;
              </button>
              <DataEntry />
            </div>
          </Modal>
        }
      </div>
    </main>
  );
}