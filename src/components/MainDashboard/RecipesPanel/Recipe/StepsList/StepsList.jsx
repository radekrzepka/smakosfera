const StepsList = props => {
	const stepsList = props.list.map((step, index) => (
		<li className="" key={index}>
			{step}
		</li>
	));

	return <ol className="list-inside list-decimal">{stepsList}</ol>;
};

export default StepsList;
