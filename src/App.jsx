import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import StartingDashboard from "./components/StartingDashboard/StartingDashboard";

const App = () => {
	const authCtx = useContext(AuthContext);

	if (!authCtx.checkIfUserLoggedIn) return <p>Ładowanie</p>;

	return (
		<>
			<p>{authCtx.isLoggedIn ? "zalogowane" : "niezalogowane"}</p>
			<StartingDashboard></StartingDashboard>
		</>
	);
};

export default App;
