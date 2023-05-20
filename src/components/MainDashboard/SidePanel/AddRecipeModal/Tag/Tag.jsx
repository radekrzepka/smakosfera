const Tag = props => {
	return (
		<li
			className={`m-1 h-max w-max cursor-pointer rounded-xl border px-4 py-1 text-xs ${
				!props.isChosen
					? "border-gray-50 bg-gray-50 text-gray-700"
					: "border-gray-700 bg-gray-700 text-gray-50"
			}`}
			onClick={props.changeIsChosen}
		>
			{props.children}
		</li>
	);
};

export default Tag;
