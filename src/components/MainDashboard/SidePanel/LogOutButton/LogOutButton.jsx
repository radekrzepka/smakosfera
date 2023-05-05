import { useContext } from "react";
import { AuthContext } from "../../../../context/auth-context";

const LogOutButton = () => {
	const authCtx = useContext(AuthContext);

	const logOutHandler = () => {
		authCtx.logOutHandler();
	};

	return (
		<div>
			<button onClick={logOutHandler}>Wyloguj się</button>
		</div>
	);
};

export default LogOutButton;
