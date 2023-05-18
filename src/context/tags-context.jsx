import React, { useContext, useEffect, useState } from "react";
import { getAllTags } from "../services/databaseServices";
import { RecipesContext } from "./recipes-context";

export const TagsContext = React.createContext({
	tags: [],
	changeIsChosen: () => {},
});

export const TagsContextProvider = props => {
	const [tags, setTags] = useState([]);
	const [tagsIdArray, setTagsIdArray] = useState([]);
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
			setTagsIdArray(idTagsArray);
			recipeCtx.setRecipes(idTagsArray);

			return tags;
		});
	};

	return (
		<TagsContext.Provider
			value={{
				tags: tags,
				changeIsChosen: changeIsChosen,
				tagsIdArray: tagsIdArray,
			}}
		>
			{props.children}
		</TagsContext.Provider>
	);
};
