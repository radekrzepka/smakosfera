const Tag = props => {
	return (
		<li className="m-1 rounded-xl border border-gray-700 bg-gray-700 px-4 py-1 text-xs text-gray-50">
			{props.children}
		</li>
	);
};

export default Tag;
