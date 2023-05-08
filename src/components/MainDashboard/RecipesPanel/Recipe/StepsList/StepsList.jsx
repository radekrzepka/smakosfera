const StepsList = props => {
	const stepsList = props.list.map((step, index) => (
		<li key={index}>{step}</li>
	));

	return <ul>{stepsList}</ul>;
};

export default StepsList;
