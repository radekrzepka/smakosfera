import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import StartingDashboard from "./components/StartingDashboard/StartingDashboard";
import MainDashboard from "./components/MainDashboard/MainDashboard";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

const App = () => {
	const authCtx = useContext(AuthContext);

	return (
		<>
			{!authCtx.userData && <LoadingScreen></LoadingScreen>}
			{authCtx.userData && authCtx.isLoggedIn && (
				<MainDashboard></MainDashboard>
			)}
			{authCtx.userData && !authCtx.isLoggedIn && (
				<StartingDashboard></StartingDashboard>
			)}
		</>
	);
};

export default App;
