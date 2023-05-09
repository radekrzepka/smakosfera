import { initializeApp } from "firebase/app";
import {
	getFirestore,
	getDocs,
	collection,
	getDoc,
	doc,
} from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getUserUsernameByGivenId = async userId => {
	const usersSnap = await getDocs(collection(db, "users"));

	return new Promise((resolve, reject) => {
		if (usersSnap.empty) reject("No data");

		usersSnap.forEach(doc => {
			const name = doc.data().userName;
			const id = doc.id;
			if (userId === id) {
				resolve(name);
			}
		});
	});
};

export const getTagNameByGivenId = async givenId => {
	const tagsSnap = await getDocs(collection(db, "recipesTags"));

	return new Promise((resolve, reject) => {
		if (tagsSnap.empty) reject("No data");

		tagsSnap.forEach(doc => {
			const tagName = doc.data().name;
			const id = doc.id;
			if (id === givenId) resolve(tagName);
		});
	});
};

export const getAllRecipes = async () => {
	const recipesSnap = await getDocs(collection(db, "recipes"));

	return new Promise((resolve, reject) => {
		if (recipesSnap.empty) reject("No data");
		const recipes = [];

		recipesSnap.forEach(doc => {
			const recipe = doc.data();
			const id = doc.id;

			const recipeObject = {
				id: id,
				...recipe,
			};

			getTagsNameArrayFromTagsIdArray(recipe.tags).then(tagsArr => {
				recipeObject.tags = tagsArr;
			});

			recipes.push(recipeObject);
		});
		resolve(recipes);
	});
};

export const getAllUserRecpies = async userId => {
	const recipesSnap = await getDocs(collection(db, "recipes"));

	return new Promise((resolve, reject) => {
		if (recipesSnap.empty) reject("No data");
		const userRecipes = [];

		recipesSnap.forEach(doc => {
			const recipe = doc.data();
			const id = doc.id;

			if (userId === recipe.author) {
				const recipeObject = {
					id: id,
					...recipe,
				};

				getTagsNameArrayFromTagsIdArray(recipe.tags).then(tagsArr => {
					recipeObject.tags = tagsArr;
				});

				userRecipes.push(recipeObject);
			}
		});

		resolve(userRecipes);
	});
};

export const getAllUserFavoriteRecpies = async userId => {
	const userSnap = await getDoc(doc(db, "users", userId));
	const recipesSnap = await getDocs(collection(db, "recipes"));
	const favoriteRecipesId = userSnap.data().favoriteRecipes;

	return new Promise((resolve, reject) => {
		if (recipesSnap.empty) reject("No data");
		const userFavoriteRecipes = [];

		recipesSnap.forEach(doc => {
			const recipe = doc.data();
			const recipeId = doc.id;
			if (favoriteRecipesId.includes(recipeId)) {
				const recipeObject = {
					id: recipeId,
					...recipe,
				};

				getTagsNameArrayFromTagsIdArray(recipe.tags).then(tagsArr => {
					recipeObject.tags = tagsArr;
				});

				userFavoriteRecipes.push(recipeObject);
			}
		});
		resolve(userFavoriteRecipes);
	});
};

export const getTagsNameArrayFromTagsIdArray = async tagsIdArray => {
	return Promise.all(
		tagsIdArray.map(async tag => {
			const tagName = await getTagNameByGivenId(tag);
			return {
				tagName: tagName,
				tagId: tag,
			};
		})
	);
};
