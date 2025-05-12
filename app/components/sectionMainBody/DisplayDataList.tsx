import { useEffect, useState } from "react";
import { RootState, setSelectedItemId } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function DisplayDataList() {

	const dispatch = useDispatch();
	const selectedLocation = useSelector((state: RootState) => state.dropdowns.selectedLocation);
	const selectedPeriod = useSelector((state: RootState) => state.dropdowns.selectedPeriod);
	const { items, selectedItemId } = useSelector((state: RootState) => state.data);

	const [filteredItemIdArr, setFilteredItemIdArr] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const filterData = async () => {
			setIsLoading(true);

			try {
				setTimeout(() => {
					setIsLoading(false);

					const filteredIdArr = items.filter((item: any) => item.period === selectedPeriod && item.location === selectedLocation)
						.map((item: any) => item.id); // Filter the items based on selected period and location

					setFilteredItemIdArr(filteredIdArr || []);  // filter it?
				}, 1100);

			} catch (err) {
				console.error("Error fetching Data", err);
				setIsLoading(false);
			}
		};

		if (selectedPeriod && selectedLocation) filterData();
		else setFilteredItemIdArr([]);

	}, [selectedPeriod, selectedLocation]); // , items]

	// TODO: Create Components for each item, and as each item gets changed,
	// the component will rerender only that item, not the whole list.


	const handleSelection = (itemId: string) => {
		dispatch(setSelectedItemId(itemId)); // Dispatch the approved items to the Redux store
	}

	return (
		<div className="flex flex-col gap-2">
			{
				isLoading ? (
					<div className="flex justify-center items-center h-20">
						<div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
					</div>
				) : (
					filteredItemIdArr.map((itemId: string) => {

						const item = items.find((item: any) => item.id === itemId); // Find the item by ID
						if (!item) return null; // If item not found, skip rendering

						return (
						<div key={item.id}
							className={`flex item-center border rounded-md p-2 cursor-pointer ${selectedItemId === item.id ? "bg-blue-100 border-blue-500" : ""
								}`}
							onClick={() => handleSelection(item.id)} // Handle click to select the item

						>
							{/* Radio Button */}
							<input
								type="radio"
								className="mr-2"
								checked={selectedItemId === item.id}
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
					)}
				)
				)
			}
		</div>
	);
}