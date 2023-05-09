import { useEffect, useState } from "react";
import { getUserUsernameByGivenId } from "../../../../services/databaseServices";
import TagsList from "./TagsList/TagsList";
import IngredientsList from "./IngredientsList/IngredientsList";
import StepsList from "./StepsList/StepsList";
import AddDate from "./AddDate/AddDate";

const Recipe = props => {
	const [authorName, setAuthorName] = useState(undefined);

	useEffect(() => {
		getUserUsernameByGivenId(props.recipe.author).then(data => {
			setAuthorName(data);
		});
	}, [props.recipe.author]);

	if (authorName !== undefined) {
		console.log(props.recipe.tags[0]);
		return (
			<div className="border-4">
				<p>{props.recipe.name}</p>
				<AddDate date={props.recipe.addDate.seconds}></AddDate>
				<p>{authorName}</p>
				<TagsList list={props.recipe.tags}></TagsList>
				<IngredientsList list={props.recipe.ingredients}></IngredientsList>
				<StepsList list={props.recipe.steps}></StepsList>
			</div>
		);
	}
};

export default Recipe;
