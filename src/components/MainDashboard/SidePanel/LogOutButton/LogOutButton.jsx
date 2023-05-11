import { useContext } from "react";
import { AuthContext } from "../../../../context/auth-context";

const LogOutButton = () => {
	const authCtx = useContext(AuthContext);

	const logOutHandler = () => {
		authCtx.logOutHandler();
	};

	return (
		<div>
			<button
				className="m-3 rounded bg-emerald-900 px-8 py-1 text-emerald-50"
				onClick={logOutHandler}
			>
				Wyloguj się
			</button>
		</div>
	);
};

export default LogOutButton;
