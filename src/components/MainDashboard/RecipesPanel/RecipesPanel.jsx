import { useContext, useEffect, useState } from "react";
import Recipe from "./Recipe/Recipe";
import { AuthContext } from "../../../context/auth-context";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import { RecipesContext } from "../../../context/recipes-context";

const RecipesPanel = props => {
	const [recipes, setRecipes] = useState(undefined);
	const authCtx = useContext(AuthContext);
	const recipesCtx = useContext(RecipesContext);

	useEffect(() => {
		switch (props.selectedSite) {
			case "none":
				setRecipes([]);
				break;
			case "home":
				setRecipes(recipesCtx.allRecipes);
				break;
			case "myRecipes":
				setRecipes(recipesCtx.userRecipes);
				break;
			case "favorite":
				setRecipes(recipesCtx.userFavoriteRecipes);
				break;
		}
	}, [
		authCtx.userData.uid,
		props.selectedSite,
		recipesCtx.allRecipes,
		recipesCtx.userFavoriteRecipes,
		recipesCtx.userRecipes,
	]);

	if (recipes !== undefined) {
		const recipesList = recipes.map(recipe => (
			<Recipe key={`${recipe.id} ${Date.now()}`} recipe={recipe}></Recipe>
		));

		return <div className="mx-3 grid justify-items-center">{recipesList}</div>;
	} else {
		return <LoadingScreen></LoadingScreen>;
	}
};

export default RecipesPanel;
