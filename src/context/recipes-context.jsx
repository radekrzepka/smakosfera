import React, { useContext, useEffect, useState } from "react";
import { getAllRecipes } from "../services/databaseServices";
import { AuthContext } from "./auth-context";

export const RecipesContext = React.createContext({
	allRecipes: [],
	userRecipes: [],
	userFavoriteRecipes: [],
	setRecipes: () => {},
});

export const RecipesContextProvider = props => {
	const [allRecipes, setAllRecipes] = useState([]);
	const [userRecipes, setUserRecipes] = useState([]);
	const [userFavoriteRecipes, setUserFavoriteRecipes] = useState([]);

	const authCtx = useContext(AuthContext);

	const filterRecipeListByTags = (recipeList, tagsList) => {
		const filteredRecipes = recipeList.filter(recipe => {
			return tagsList.every(tag => recipe.tags.includes(tag));
		});

		return filteredRecipes;
	};

	const setRecipes = (tagsList = null) => {
		getAllRecipes().then(data => {
			const sortedData = data.sort(
				(a, b) => b.addDate.seconds - a.addDate.seconds
			);

			const userRecipes = sortedData.filter(
				recipe => recipe.author === authCtx.userData.uid
			);

			const userFavoriteRecipes = sortedData.filter(recipe =>
				recipe.usersFavorites.includes(authCtx.userData.uid)
			);

			console.log(tagsList);

			if (tagsList && tagsList.length !== 0) {
				const test = filterRecipeListByTags(sortedData, tagsList);
				console.log(sortedData);
				setAllRecipes(test);
				setUserRecipes(filterRecipeListByTags(userRecipes, tagsList));
				setUserFavoriteRecipes(
					filterRecipeListByTags(userFavoriteRecipes, tagsList)
				);
			} else {
				setAllRecipes(sortedData);
				setUserRecipes(userRecipes);
				setUserFavoriteRecipes(userFavoriteRecipes);
			}
		});
	};

	useEffect(() => {
		setRecipes();
	}, []);

	return (
		<RecipesContext.Provider
			value={{
				allRecipes: allRecipes,
				userRecipes: userRecipes,
				userFavoriteRecipes: userFavoriteRecipes,
				setRecipes: setRecipes,
			}}
		>
			{props.children}
		</RecipesContext.Provider>
	);
};
