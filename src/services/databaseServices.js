import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
				[id]: tagName,
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
			const recipes = doc.data();
			const id = doc.id;
			tags.push({
				[id]: recipes,
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
			const recipes = doc.data();
			if (userId === recipes.author) userRecipes.push(recipes);
		});
		resolve(userRecipes);
	});
};
