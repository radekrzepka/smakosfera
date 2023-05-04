import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import StartingDashboard from "./components/StartingDashboard/StartingDashboard";
import MainDashboard from "./components/MainDashboard/MainDashboard";

const App = () => {
	const authCtx = useContext(AuthContext);

	if (!authCtx.checkIfUserLoggedIn) return <p>Ładowanie</p>;

	return (
		<>
			{!authCtx.isLoggedIn && <StartingDashboard></StartingDashboard>}
			{authCtx.isLoggedIn && <MainDashboard></MainDashboard>}
		</>
	);
};

export default App;
