const IngredientsList = props => {
	const ingredientsList = props.list.map((ingredient, index) => (
		<li
			className="m-1 rounded-xl border border-gray-700 bg-gray-700 px-4 py-1 text-xs text-gray-50"
			key={index}
		>
			{ingredient}
		</li>
	));

	return <ol className="">{ingredientsList}</ol>;
};

export default IngredientsList;
