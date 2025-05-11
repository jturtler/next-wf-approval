import { useEffect, useState } from "react";
import { RootState, setSelectedItems } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function DisplayDataList() {

	const dispatch = useDispatch();
	const selectedLocation = useSelector((state: RootState) => state.dropdowns.selectedLocation);
	const selectedPeriod = useSelector((state: RootState) => state.dropdowns.selectedPeriod);
	const { items, selectedItemIds } = useSelector((state: RootState) => state.data);

	const [filtedItems, setFilteredItems] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	//const [approvedItems, setApprovedItems] = useState<string[]>([]); // State for approved items
	//const [selectedItem, setSelectedItem] = useState<string | null>(null); // State for selected item

	useEffect(() => {
		const filterData = async () => {
			setIsLoading(true);

			try {
				setTimeout(() => {
					setIsLoading(false);

					const filteredItems = items.filter((item: any) => item.period === selectedPeriod && item.location === selectedLocation);

					setFilteredItems(filteredItems || []);  // filter it?
				}, 1100);

			} catch (err) {
				console.error("Error fetching Data", err);
				setIsLoading(false);
			}
		};

		if (selectedPeriod && selectedLocation) filterData();
		else setFilteredItems([]);

	}, [selectedPeriod, selectedLocation]);

	/*
	const toggleApproval = (itemId: string) => {
		const selectedItems = selectedItemIds.includes(itemId) ? selectedItemIds.filter((id: string) => id !== itemId)	: [...selectedItemIds, itemId]; // Add if not approved			
		dispatch(setSelectedItems( selectedItems )); // Dispatch the approved items to the Redux store
		//setApprovedItems((prev) => prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId] );
	 };*/

	const handleSelection = (itemId: string) => {
		//setSelectedItem(itemId); // Set the selected item
		dispatch(setSelectedItems([itemId])); // Dispatch the approved items to the Redux store
	}

	return (
		<div className="flex flex-col gap-2">
			{
				isLoading ? (
					<div className="flex justify-center items-center h-20">
						<div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
					</div>
				) : (
					filtedItems.map((item: any) => (
						<div key={item.id}
							className={`flex item-center border rounded-md p-2 cursor-pointer ${selectedItemIds.includes(item.id) ? "bg-blue-100 border-blue-500" : ""
								}`}
							onClick={() => handleSelection(item.id)} // Handle click to select the item

						>
							{/* Radio Button */}
							<input
								type="radio"
								className="mr-2"
								checked={selectedItemIds.includes(item.id)}
								readOnly
								aria-label={`Select ${item.title}`}
							/>
							{/* Item Content */}
							<div className="flex-1">
								<div className="flex">
									<div className="p-1 font-semibold">{item.title}</div>
									<div className="text-sm text-gray-500 mt-1 ml-1 italic">[{item.status}]</div>
								</div>
								<table className=" border border-gray-300 text-sm">
									<thead>
										<tr className="bg-gray-100">
											<th className="text-left p-2">Data element</th>
											<th className="text-left p-2">Value</th>
										</tr>
									</thead>
									<tbody>
										{
											item.disaggregations.map((dgItem: any) => (
												<tr key={dgItem.name} className="border border-gray-300">
													<td className="p-2">{dgItem.name}</td>
													<td className="p-2">{dgItem.value}</td>
												</tr>
											))
										}
									</tbody>
								</table>
							</div>
						</div>
					))
				)
			}
		</div>
	);
}