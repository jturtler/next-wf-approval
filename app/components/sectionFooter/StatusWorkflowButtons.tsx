import { useEffect, useState } from "react";
import { RootState, updateItem } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import statusWorkflow from "../../data/statusWorkflow.json"; // Import the workflow buttons data

export default function StatusWorkflowButtons() {

	const dispatch = useDispatch();
	const selectedItemId = useSelector((state: RootState) => state.data.selectedItemId);
	const items = useSelector((state: RootState) => state.data.items); // Get all items

	const [nextWorkfowStatusArr, setNextWorkfowStatusArr] = useState<any[]>([]);

	const getWorkflowButtons = () => {

		try {
			const workflowStatusIds: string[] = [];

			if (selectedItemId) {
				// Find the selected item
				const selectedItem = items.find((item) => item.id === selectedItemId);

				if (selectedItem) {
					// Get the workflow buttons based on the selected item
					const selectedWorkflow = statusWorkflow.statusList.find((workflow) => workflow.status === selectedItem.status);

					if (selectedWorkflow && selectedWorkflow.nextStatus) {
						selectedWorkflow.nextStatus.forEach((statusStr) => workflowStatusIds.push(statusStr));
					}
				}
			}

			setNextWorkfowStatusArr(workflowStatusIds); // Clear the buttons if no item is selected
		} catch (err) {
			console.error("Error fetching Data", err);
		}
	};

	// getWorkflowButtons();

	
	useEffect(() => {
		// Why is this called within the useEffect?  Too many rerenders if defined outside..
		getWorkflowButtons();

	}, [selectedItemId, items]);


	const updateItemStatus = (itemId: string, status: string) => {

		const confirmAction = window.confirm(`Are you sure you want to update the status of item ${itemId} to ${status}?`);
		if (!confirmAction) return; // If the user cancels, do nothing

		const selectedItem = items.find((item) => item.id === itemId);

		if (selectedItem) dispatch(updateItem({ ...selectedItem, status })); // Dispatch the approved items to the Redux store
		else alert("Item not found!"); // Handle the case when the item is not found
	}

	return (
		<div className="flex gap-2 items-center">
			{nextWorkfowStatusArr.map((status) => {
				const statusObj = statusWorkflow.statusList.find((workflow) => workflow.status === status);
				// ${statusObj?.className}  <-- color?

				if (!statusObj) return null; // If status object not found, skip rendering
				return (
					<button key={status} className={`px-2 py-1 text-sm text-blue-600 border hover:bg-blue-200 cursor-pointer border-blue-600 rounded`}
						onClick={() => updateItemStatus(selectedItemId, status)} >
						{statusObj.label}
					</button>
				);
			})
			}
			{
				(selectedItemId) && (
					<label className="text-sm text-gray-500">Selected Item: {selectedItemId}</label>
				)
			}
		</div>
	);
}	
