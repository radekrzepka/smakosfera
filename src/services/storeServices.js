import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export const getImageByRecipeId = async recipeId => {
	return new Promise((resolve, reject) => {
		getDownloadURL(ref(storage, `recipesImages/${recipeId}.jpg`))
			.then(url => {
				resolve(url);
			})
			.catch(error => {
				reject(error);
			});
	});
};
