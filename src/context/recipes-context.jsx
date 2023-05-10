import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../services/databaseServices";

export const RecipesContext = React.createContext({
	allRecipes: [],
});

export const RecipesContextProvider = props => {
	const [allRecipes, setAllRecipes] = useState([]);

	useEffect(() => {
		getAllRecipes().then(data => setAllRecipes(data));
	}, []);

	return (
		<RecipesContext.Provider
			value={{
				allRecipes: allRecipes,
			}}
		>
			{props.children}
		</RecipesContext.Provider>
	);
};
