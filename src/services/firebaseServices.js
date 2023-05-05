import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import {
	getFirestore,
	doc,
	setDoc,
	collection,
	getDocs,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB2hu66cnmUet9R88qFpMV6jICnwQ8pYdc",
	authDomain: "smakosfera-a84c7.firebaseapp.com",
	projectId: "smakosfera-a84c7",
	storageBucket: "smakosfera-a84c7.appspot.com",
	messagingSenderId: "823136018443",
	appId: "1:823136018443:web:f7cdc07aa65f9f1cf4270e",
	measurementId: "G-DQ0HP4HVLZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const createUser = async (email, password) => {
	return new Promise((resolve, reject) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const { uid, email } = userCredential.user;
				setDoc(doc(db, "users", uid), {
					userName: "",
					email: email,
					favoriteRecipes: [],
				});
				resolve({ uid: uid, email: email });
			})
			.catch(error => {
				reject(error);
			});
	});
};

export const logIn = async (email, password) => {
	return new Promise((resolve, reject) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const { uid, email } = userCredential.user;
				resolve({ uid: uid, email: email });
			})
			.catch(error => {
				reject(error);
			});
	});
};

export const logOut = async () => {
	signOut(auth);
};

export const getUserData = async () => {
	return new Promise((resolve, reject) => {
		auth.onAuthStateChanged(user => {
			if (user) {
				const { uid, email } = user;
				resolve({ uid: uid, email: email });
			} else {
				reject();
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
			const tag = doc.data().name;
			tags.push(tag);
		});
		resolve(tags);
	});
};
