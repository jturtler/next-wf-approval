import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";


export default function DisplayDataList() {

	const selectedLocation = useSelector((state: RootState) => state.dropdowns.selectedLocation);
	const selectedPeriod = useSelector((state: RootState) => state.dropdowns.selectedPeriod);
	const { items } = useSelector((state: RootState) => state.data);

	const [filtedItems, setFilteredItems] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const filterData = async () => {
			setIsLoading(true);

			try {
				setTimeout(() => {
					setIsLoading(false);

					const filteredItems = items.filter((item: any) => item.period === selectedPeriod && item.location === selectedLocation);

					console.log("filteredItems", filteredItems);

					setFilteredItems(filteredItems || []);  // filter it?
				}, 1500);

			} catch (err) {
				console.error("Error fetching Data", err);
				setIsLoading(false);
			}
		};

		if (selectedPeriod && selectedLocation) filterData();
		else setFilteredItems( [] );

	}, [selectedPeriod, selectedLocation]);


	return (
		<div className="">
			{
				isLoading ? (
					<div className="flex justify-center items-center h-20">
						<div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
					</div>
				) : (
					filtedItems.map((item: any) => (
						<div key={item.id} className="py-2">
							<div className="p-1 font-semibold">{item.title}</div>
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
					))
				)
			}
		</div>
	);
}