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

export const checkIfUserHasUserName = async userId => {
	const usersSnap = await getDocs(collection(db, "users"));

	return new Promise((resolve, reject) => {
		if (usersSnap.empty) reject("No data");

		usersSnap.forEach(doc => {
			const name = doc.data().userName;
			const id = doc.id;
			if (userId === id) {
				if (name !== "") resolve(true);
				else resolve(false);
			}
		});
	});
};

export const getUserUserNameByGivenId = async userId => {
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

export const checkIfUsernameInDb = async username => {
	const usersSnap = await getDocs(collection(db, "users"));

	return new Promise((resolve, reject) => {
		if (usersSnap.empty) reject("No data");

		usersSnap.forEach(doc => {
			const name = doc.data().userName;
			if (username === name) {
				resolve(true);
			}
		});
		resolve(false);
	});
};

export const getAllRecipesTags = async () => {
	const tagsSnap = await getDocs(collection(db, "recipesTags"));

	return new Promise((resolve, reject) => {
		if (tagsSnap.empty) reject("No data");
		const tags = [];

		tagsSnap.forEach(doc => {
			const tagName = doc.data().name;
			const id = doc.id;
			tags.push({
				id: id,
				tagName: tagName,
			});
		});
		resolve(tags);
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
		const tags = [];

		recipesSnap.forEach(doc => {
			const recipe = doc.data();
			const id = doc.id;
			tags.push({
				id: id,
				...recipe,
			});
		});
		resolve(tags);
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
			if (userId === recipe.author)
				userRecipes.push({
					id: id,
					...recipe,
				});
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
			if (favoriteRecipesId.includes(recipeId))
				userFavoriteRecipes.push({
					id: recipeId,
					...recipe,
				});
		});
		resolve(userFavoriteRecipes);
	});
};
