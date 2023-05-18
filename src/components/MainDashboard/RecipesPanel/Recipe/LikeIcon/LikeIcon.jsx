import { useContext, useEffect, useState } from "react";
import EmptyHeart from "../../../../../assets/heart_icon.png";
import FullHeart from "../../../../../assets/full_heart_icon.png";
import { AuthContext } from "../../../../../context/auth-context";
import { toggleUserInUsersFavorites } from "../../../../../services/databaseServices";
import { TagsContext } from "../../../../../context/tags-context";
import { RecipesContext } from "../../../../../context/recipes-context";

const LikeIcon = ({ recipe }) => {
	const [isLiked, setIsLiked] = useState();

	const authCtx = useContext(AuthContext);
	const tagsCtx = useContext(TagsContext);
	const recipeCtx = useContext(RecipesContext);

	const clickHandler = () => {
		toggleUserInUsersFavorites(recipe.id, authCtx.userData.uid)
			.then(setIsLiked(prevState => !prevState))
			.then(recipeCtx.setRecipes(tagsCtx.tagsIdArray));
	};

	useEffect(() => {
		if (recipe.usersFavorites.includes(authCtx.userData.uid)) setIsLiked(true);
		else setIsLiked(false);
	}, []);

	return (
		<img
			alt="Ikona polubienia postu"
			className="inline w-4 cursor-pointer"
			onClick={clickHandler}
			src={isLiked ? FullHeart : EmptyHeart}
		/>
	);
};

export default LikeIcon;
