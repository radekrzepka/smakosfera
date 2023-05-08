import { useEffect, useState } from "react";
import {
	getTagNameByGivenId,
	getUserUserNameByGivenId,
} from "../../../../services/databaseServices";
import TagsList from "./TagsList/TagsList";
import IngredientsList from "./IngredientsList/IngredientsList";
import StepsList from "./StepsList/StepsList";
import AddDate from "./AddDate/AddDate";

const Recipe = props => {
	const [authorName, setAuthorName] = useState("");
	const [tagsList, setTagsList] = useState([]);

	useEffect(() => {
		getUserUserNameByGivenId(props.recipe.author).then(data => {
			setAuthorName(data);
		});

		const tags = [];

		props.recipe.tags.forEach(tag => {
			getTagNameByGivenId(tag).then(data => {
				tags.push({
					id: tag,
					name: data,
				});
			});
		});

		setTagsList(tags);
	}, []);

	return (
		<div className="border-4">
			<p>{props.recipe.name}</p>
			<AddDate date={props.recipe.addDate.seconds}></AddDate>
			<p>{authorName}</p>
			<TagsList list={tagsList}></TagsList>
			<IngredientsList list={props.recipe.ingredients}></IngredientsList>
			<StepsList list={props.recipe.steps}></StepsList>
		</div>
	);
};

export default Recipe;
