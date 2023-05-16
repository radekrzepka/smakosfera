const Input = ({ type, index, change }) => {
	const handleChange = event => {
		change({ type: "changeValue", index: index, value: event.target.value });
	};

	return (
		<div className="grid w-full grid-rows-1 place-items-center">
			<input
				id={`${type}-${index}`}
				className="m-1 w-3/4 rounded border border-emerald-900"
				onChange={handleChange}
			></input>
		</div>
	);
};

export default Input;
