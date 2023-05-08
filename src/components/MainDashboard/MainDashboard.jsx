import { useState } from "react";
import SidePanel from "./SidePanel/SidePanel";
import RecipesPanel from "./RecipesPanel/RecipesPanel";

const MainDashboard = () => {
	const [selectedSite, setSelectedSite] = useState("home");

	return (
		<main>
			<SidePanel
				selectedSite={selectedSite}
				setSelectedSite={setSelectedSite}
			></SidePanel>
			<RecipesPanel
				selectedSite={selectedSite}
				setSelectedSite={setSelectedSite}
			></RecipesPanel>
		</main>
	);
};

export default MainDashboard;
