

export default function ItemDisplay({ item }: { item: any }) {

	return (
		<>
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
		</>
	);
}