import React, { useEffect, useState } from "react";
import { getUserData, logOut } from "../services/firebaseServices";

export const AuthContext = React.createContext({
	isLoggedIn: false,
	userData: undefined,
	logInHandler: () => {},
	logOutHandler: () => {},
});

export const AuthContextProvider = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState(undefined);

	const logInHandler = user => {
		setIsLoggedIn(true);
		setUserData(user);
	};

	const logOutHandler = () => {
		logOut();
		setIsLoggedIn(false);
		setUserData({});
	};

	useEffect(() => {
		getUserData()
			.then(user => {
				setIsLoggedIn(true);
				setUserData(user);
			})
			.catch(() => {
				setIsLoggedIn(false);
				setUserData({});
			});
	}, []);

	return (
		<AuthContext.Provider
			value={{
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
