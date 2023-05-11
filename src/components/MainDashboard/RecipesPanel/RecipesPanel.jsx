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
		const userRecipes = recipesCtx.allRecipes.filter(
			recipe => recipe.author === authCtx.userData.uid
		);

		const userFavoriteRecipes = recipesCtx.allRecipes.filter(recipe =>
			recipe.usersFavorites.includes(authCtx.userData.uid)
		);

		switch (props.selectedSite) {
			case "home":
				setRecipes(recipesCtx.allRecipes);
				break;
			case "myRecipes":
				setRecipes(userRecipes);
				break;
			case "favorite":
				setRecipes(userFavoriteRecipes);
				break;
		}
	}, [authCtx.userData.uid, props.selectedSite, recipesCtx.allRecipes]);

	if (recipes !== undefined) {
		const recipesList = recipes.map(recipe => (
			<Recipe key={recipe.id} recipe={recipe}></Recipe>
		));

		return <div className="mx-3 grid justify-items-center">{recipesList}</div>;
	} else {
		return <LoadingScreen></LoadingScreen>;
	}
};

export default RecipesPanel;
