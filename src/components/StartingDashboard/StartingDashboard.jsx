import LogInDashboard from "./LogInDashboard/LogInDashboard";
import SignInDashboard from "./SignInDashboard/SignInDashboard";

import photo from "../../assets/starting_dashboard_photo.jpg";

const StartingDashboard = () => {
	return (
		<main className="grid min-h-screen grid-cols-2 grid-rows-[auto_auto] bg-emerald-900 font-Comme md:grid-cols-2 md:grid-rows-[auto_auto_1fr]">
			<LogInDashboard></LogInDashboard>
			<SignInDashboard></SignInDashboard>
			<div className="col-span-2 ml-6 mt-5 flex flex-col md:col-span-1 md:row-start-2 lg:ml-16">
				<h1 className="mb-3 text-5xl text-emerald-50">Witaj w smakosferze</h1>
				<h2 className="mb-3 text-xl text-emerald-50">
					Twojej wirtualnej książce z przepisami
				</h2>
				<img
					src={photo}
					alt="Zdjęcie przedstawiające ksążke z przepisami"
					className="w-11/12 saturate-50"
				/>
			</div>
		</main>
	);
};

export default StartingDashboard;
