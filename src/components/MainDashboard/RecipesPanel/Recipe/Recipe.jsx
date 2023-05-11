import { useEffect, useState } from "react";
import { getUserUsernameByGivenId } from "../../../../services/databaseServices";
import TagsList from "./TagsList/TagsList";
import IngredientsList from "./IngredientsList/IngredientsList";
import StepsList from "./StepsList/StepsList";
import AddDate from "./AddDate/AddDate";
import { getImageByRecipeId } from "../../../../services/storeServices";

const Recipe = props => {
	const [authorName, setAuthorName] = useState(undefined);
	const [imageUrl, setImageUrl] = useState(undefined);

	useEffect(() => {
		getUserUsernameByGivenId(props.recipe.author).then(data => {
			setAuthorName(data);
		});
		getImageByRecipeId(props.recipe.id).then(url => {
			setImageUrl(url);
		});
	}, [props.recipe.author, props.recipe.id]);

	if (authorName !== undefined && imageUrl !== undefined) {
		return (
			<div className="m-3 grid h-max w-full place-items-center rounded bg-emerald-50 p-3 text-center lg:w-9/12">
				<h3 className="text-4xl">{props.recipe.name}</h3>
				<p>
					<AddDate date={props.recipe.addDate.seconds}></AddDate>
					<span className="text-xs text-gray-600">• {authorName}</span>
				</p>

				<TagsList list={props.recipe.tags}></TagsList>
				<img
					className="h-96"
					src={imageUrl}
					alt={`Zdjęcie przedstawiające ${props.recipe.name}`}
				></img>
				<p className="m-2 text-xl">Lista składników:</p>
				<IngredientsList list={props.recipe.ingredients}></IngredientsList>
				<p className="mt-3 text-xl">Jak przyrządzić:</p>
				<StepsList list={props.recipe.steps}></StepsList>
			</div>
		);
	}
};

export default Recipe;
