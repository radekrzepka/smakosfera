import { initializeApp } from "firebase/app";
import {
	getFirestore,
	getDocs,
	collection,
	doc,
	updateDoc,
	setDoc,
	runTransaction,
} from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import { addNewImage } from "./storeServices";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const checkIfTheUserHasUsername = async userId => {
	const usersSnap = await getDocs(collection(db, "users"));

	return new Promise((resolve, reject) => {
		if (usersSnap.empty) reject("No data");

		usersSnap.forEach(doc => {
			const name = doc.data().userName;
			const id = doc.id;
			if (userId === id) {
				if (name !== "") resolve(true);
				resolve(false);
			}
		});
	});
};

export const checkIfUserNameInDb = async givenUserName => {
	const usersSnap = await getDocs(collection(db, "users"));

	return new Promise((resolve, reject) => {
		if (usersSnap.empty) reject("No data");

		usersSnap.forEach(doc => {
			const username = doc.data().userName;
			if (givenUserName === username) {
				resolve(true);
			}
		});

		resolve(false);
	});
};

export const changeUsername = async (userId, newUsername) => {
	const userRef = doc(db, "users", userId);

	await updateDoc(userRef, {
		userName: newUsername,
	});
};

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
			if (doc.data().approved) {
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
			}
		});
		resolve(recipes);
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

export const getAllTags = async () => {
	const tagsSnap = await getDocs(collection(db, "recipesTags"));

	return new Promise((resolve, reject) => {
		if (tagsSnap.empty) reject("No data");
		const tags = [];

		tagsSnap.forEach(doc => {
			const tagName = doc.data().name;
			const id = doc.id;

			tags.push({
				id: id,
				name: tagName,
			});
		});

		resolve(tags);
	});
};

export const addNewRecipe = async (recipe, file) => {
	const newRef = doc(collection(db, "recipes"));

	addNewImage({ name: `${newRef.id}.jpg`, file: file });

	await setDoc(newRef, recipe);
};

export const toggleUserInUsersFavorites = async (recipeId, userId) => {
	const recipeRef = doc(collection(db, "recipes"), recipeId);

	try {
		await runTransaction(db, async transaction => {
			const doc = await transaction.get(recipeRef);
			const newUsersFavorites = doc.data().usersFavorites || [];

			if (newUsersFavorites.includes(userId)) {
				const index = newUsersFavorites.indexOf(userId);
				newUsersFavorites.splice(index, 1);
			} else {
				newUsersFavorites.push(userId);
			}

			transaction.update(recipeRef, { usersFavorites: newUsersFavorites });
		});
	} catch (error) {
		console.log("Transaction failed: ", error);
	}
};
