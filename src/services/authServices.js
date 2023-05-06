import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

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
