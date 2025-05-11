import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";


export default function StatusWorkflowButtons() {

	const selectedItemIdsInfo = useSelector((state: RootState) => state.data.selectedItemIds);

  return (
	 <div className="flex gap-2 items-center">
		<button className="px-2 py-1 text-sm text-blue-600 border border-blue-600 rounded">Ready for approval</button>
		<button className="px-2 py-1 text-sm bg-blue-600 text-white rounded">Approve</button>
		<label className="text-sm text-gray-500">{selectedItemIdsInfo.length} items selected</label>
	 </div>
  );  
}	
