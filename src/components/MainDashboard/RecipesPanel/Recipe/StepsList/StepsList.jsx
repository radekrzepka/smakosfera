const StepsList = props => {
	const stepsList = props.list.map((step, index) => (
		<li className="mb-1" key={index}>
			{step}
		</li>
	));

	return <ol className="list-inside list-decimal">{stepsList}</ol>;
};

export default StepsList;
