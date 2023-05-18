import { useContext, useEffect, useState } from "react";
import { getAllTags } from "../../../../services/databaseServices";
import Tag from "./Tag/Tag";
import { RecipesContext } from "../../../../context/recipes-context";

const TagsFilter = () => {
	const [tags, setTags] = useState([]);
	const recipeCtx = useContext(RecipesContext);

	useEffect(() => {
		getAllTags().then(dbTags => {
			setTags(
				dbTags.map(tag => {
					return {
						...tag,
						isChosen: false,
					};
				})
			);
		});
	}, []);

	const changeIsChosen = tagToChangeIndex => {
		setTags(prevTags => {
			const tags = prevTags.map((tag, index) => {
				if (tagToChangeIndex === index)
					return {
						...tag,
						isChosen: !tag.isChosen,
					};

				return tag;
			});

			const idTagsArray = tags.filter(tag => tag.isChosen).map(tag => tag.id);

			recipeCtx.setRecipes(idTagsArray);

			return tags;
		});
	};

	const tagsList = tags.map((tag, index) => (
		<Tag
			changeIsChosen={changeIsChosen}
			isChosen={tag.isChosen}
			key={tag.id}
			index={index}
		>
			{tag.name}
		</Tag>
	));

	return <div className="mx-3 flex flex-wrap justify-center">{tagsList}</div>;
};

export default TagsFilter;
