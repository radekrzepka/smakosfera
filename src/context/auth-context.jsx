import React, { useEffect, useState } from "react";
import { getUserData } from "../services/firebaseServices";

export const AuthContext = React.createContext({
	checkIfUserLoggedIn: false,
	isLoggedIn: false,
	logInHandler: () => {},
	logOutHandler: () => {},
	userData: {
		email: "",
		uid: "",
	},
});

export const AuthContextProvider = props => {
	const [checkIfUserLoggedIn, setCheckIfUserLoggedIn] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState({});

	const logInHandler = user => {
		setIsLoggedIn(true);
		setUserData(user);
	};

	const logOutHandler = () => {
		setIsLoggedIn(false);
		setUserData({});
	};

	useEffect(() => {
		getUserData().then(user => {
			setIsLoggedIn(true);
			setUserData(user);
		});
		setCheckIfUserLoggedIn(true);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				checkIfUserLoggedIn: checkIfUserLoggedIn,
				isLoggedIn: isLoggedIn,
				logInHandler: logInHandler,
				logOutHandler: logOutHandler,
				userData: userData,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
