export default function Modal( { isVisible, children }: { isVisible: boolean, children: React.ReactNode } ) {

	if ( !isVisible ) return null;

	return (
		<div 
			className="fixed inset-0 bg-black/25 flex justify-center items-center z-50 flex-col w-full" >
			{ children }
		</div>
	);
};