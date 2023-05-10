import { useState } from "react";
import SidePanel from "./SidePanel/SidePanel";
import RecipesPanel from "./RecipesPanel/RecipesPanel";
import { RecipesContextProvider } from "../../context/recipes-context";

const MainDashboard = () => {
	const [selectedSite, setSelectedSite] = useState("home");

	return (
		<main>
			<SidePanel
				selectedSite={selectedSite}
				setSelectedSite={setSelectedSite}
			></SidePanel>
			<RecipesContextProvider>
				<RecipesPanel
					selectedSite={selectedSite}
					setSelectedSite={setSelectedSite}
				></RecipesPanel>
			</RecipesContextProvider>
		</main>
	);
};

export default MainDashboard;
