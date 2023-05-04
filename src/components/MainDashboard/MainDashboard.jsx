import { useContext } from "react";
import { logOut } from "../../services/firebaseServices";
import { AuthContext } from "../../context/auth-context";

const MainDashboard = () => {
	const authCtx = useContext(AuthContext);

	const logOutHandler = () => {
		logOut();
		authCtx.logOutHandler();
	};

	return <button onClick={logOutHandler}>Wyloguj się</button>;
};

export default MainDashboard;
