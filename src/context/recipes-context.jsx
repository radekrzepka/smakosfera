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

	const setRecipes = () => {
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

			setAllRecipes(sortedData);
			setUserRecipes(userRecipes);
			setUserFavoriteRecipes(userFavoriteRecipes);
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
			}}
		>
			{props.children}
		</RecipesContext.Provider>
	);
};
