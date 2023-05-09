import { useContext, useEffect, useState } from "react";
import {
	getAllRecipes,
	getAllUserFavoriteRecpies,
	getAllUserRecpies,
} from "../../../services/databaseServices";
import Recipe from "./Recipe/Recipe";
import { AuthContext } from "../../../context/auth-context";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";

const RecipesPanel = props => {
	const [recipes, setRecipes] = useState([]);
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		setRecipes([]);
		switch (props.selectedSite) {
			case "home":
				getAllRecipes().then(data => {
					setRecipes(data);
				});
				break;
			case "search":
				break;
			case "myRecipes":
				getAllRecipes().then(data => {
					setRecipes(data);
				});
				getAllUserRecpies(authCtx.userData.uid).then(data => {
					setRecipes(data);
				});
				break;
			case "favorite":
				getAllUserFavoriteRecpies(authCtx.userData.uid).then(data => {
					setRecipes(data);
				});
				break;
		}
	}, [props.selectedSite, authCtx.userData.uid]);

	if (recipes.length !== 0) {
		const recipesList = recipes.map(recipe => (
			<Recipe key={recipe.id} recipe={recipe}></Recipe>
		));

		return <div>{recipesList}</div>;
	} else {
		return <LoadingScreen></LoadingScreen>;
	}
};

export default RecipesPanel;
