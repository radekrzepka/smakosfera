import { useContext, useEffect, useState } from "react";
import {
	getAllRecipes,
	getAllUserFavoriteRecpies,
	getAllUserRecpies,
} from "../../../services/databaseServices";
import Recipe from "./Recipe/Recipe";
import { AuthContext } from "../../../context/auth-context";

const RecipesPanel = props => {
	const [recipes, setRecipes] = useState([]);
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		switch (props.selectedSite) {
			case "home":
				getAllRecipes().then(data => setRecipes(data));
				break;
			case "search":
				break;
			case "myRecipes":
				getAllUserRecpies(authCtx.userData.uid).then(data => setRecipes(data));
				break;
			case "favorite":
				getAllUserFavoriteRecpies(authCtx.userData.uid).then(data =>
					setRecipes(data)
				);
				break;
		}
	}, [props.selectedSite]);

	const recipesList = recipes.map(recipe => (
		<Recipe key={recipe.id} recipe={recipe}></Recipe>
	));

	return <div>{recipesList}</div>;
};

export default RecipesPanel;
