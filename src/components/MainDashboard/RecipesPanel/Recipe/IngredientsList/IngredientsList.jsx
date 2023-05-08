const IngredientsList = props => {
	const ingredientsList = props.list.map((ingredient, index) => (
		<li key={index}>{ingredient}</li>
	));

	return <ul>{ingredientsList}</ul>;
};

export default IngredientsList;
