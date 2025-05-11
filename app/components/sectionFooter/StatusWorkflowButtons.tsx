import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import statusWorkflow from "../../data/statusWorkflow.json"; // Import the workflow buttons data

export default function StatusWorkflowButtons() {

  const selectedItemId = useSelector((state: RootState) => state.data.selectedItemId);
  const items = useSelector((state: RootState) => state.data.items); // Get all items

  	const [nextWorkfowStatusArr, setNextWorkfowStatusArr] = useState<any[]>([]);
  
	useEffect(() => {
		const getWorkflowButtons = () => {
  
			try {
				const workflowStatusIds: string[] = [];

				if ( selectedItemId ) {
					// Find the selected item
					const selectedItem = items.find((item) => item.id === selectedItemId);

					if ( selectedItem) {
						// Get the workflow buttons based on the selected item
						const selectedWorkflow = statusWorkflow.statusList.find((workflow) => workflow.status === selectedItem.status);

						if ( selectedWorkflow && selectedWorkflow.nextStatus ) {
							selectedWorkflow.nextStatus.forEach( (statusStr ) => workflowStatusIds.push(statusStr) );
						}
					}
				}

				setNextWorkfowStatusArr(workflowStatusIds); // Clear the buttons if no item is selected
			} catch (err) {
				console.error("Error fetching Data", err);
			}
		};
  
		getWorkflowButtons();
  
	}, [selectedItemId]);
  
  return (
	 <div className="flex gap-2 items-center">
		{ nextWorkfowStatusArr.map((status) => {
				const statusObj = statusWorkflow.statusList.find((workflow) => workflow.status === status);

				// ${statusObj?.className}  <-- color?
				return (
					<button key={status} className={`px-2 py-1 text-sm text-blue-600 border hover:bg-blue-200 cursor-pointer border-blue-600 rounded`}
						onClick={() => { alert('Not Implemented, yet'); } } >
						{statusObj?.label}
					</button>
				);
			})
		}
		{
			( selectedItemId ) && (
				<label className="text-sm text-gray-500">Selected Item: {selectedItemId}</label>
			)
		}
	 </div>
  );  
}	
