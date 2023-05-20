const IngredientsList = props => {
	const ingredientsList = props.list?.map((ingredient, index) => (
		<li
			className="m-1 rounded-xl border border-gray-700 bg-gray-700 px-6 py-1 text-xs text-gray-50 lg:px-12"
			key={index}
		>
			{ingredient}
		</li>
	));

	return (
		<ol className="flex flex-col flex-wrap items-center justify-center">
			{ingredientsList}
		</ol>
	);
};

export default IngredientsList;
