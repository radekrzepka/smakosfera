const StepsList = props => {
	const stepsList = props.list.map((step, index) => (
		<li className="mb-3 text-left lg:mx-5" key={index}>
			{step}
		</li>
	));

	return <ol className="list-inside list-decimal">{stepsList}</ol>;
};

export default StepsList;
