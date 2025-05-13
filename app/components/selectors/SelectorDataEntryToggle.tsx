import { useDispatch, useSelector } from "react-redux";
import { RootState, toggleDataEntry } from "../../redux/store";
import classes from "./SelectorDataEntryToggle.module.css";
import { MdSwapHoriz } from "react-icons/md";  // Material Design icon

const SelectorDataEntryToggle = () => {
  const dispatch = useDispatch();
  const isDataEntry = useSelector((state: RootState) => state.dropdowns.isDataEntry);

  const toggleDataEntryClick = () => {
    dispatch(toggleDataEntry());
  };

  //const btnClassNames =  + classes.btnSwitchDataEntry + ' bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600 cursor-pointer ';
  const btnClassNames = `${classes.btnSwitchDataEntry} bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600 cursor-pointer flex items-center gap-2`;
  // e-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600 cursor-pointer flex items-center gap-2`;

  return (
    <button className={btnClassNames}
    onClick={toggleDataEntryClick}
    >
      <MdSwapHoriz className="w-5 h-5" />
      <span>Switch To { isDataEntry? 'Data Approval' : 'Data Entry'}</span>
    </button>
  );
};

export default SelectorDataEntryToggle;