import LogInDashboard from "./LogInDashboard/LogInDashboard";
import SignInDashboard from "./SignInDashboard/SignInDashboard";

const StartingDashboard = () => {
	return (
		<main>
			<LogInDashboard></LogInDashboard>
			<SignInDashboard></SignInDashboard>
			<div>
				<p>Witaj w smakosferze</p>
				<p>Twojej wirtualne książce z przepisami</p>
			</div>
		</main>
	);
};

export default StartingDashboard;
