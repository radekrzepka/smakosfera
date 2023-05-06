import { useEffect, useState } from "react";
import SidePanel from "./SidePanel/SidePanel";
import RecipesPanel from "./RecipesPanel/RecipesPanel";

const MainDashboard = () => {
	const [selectedSite, useSelectedSite] = useState("");

	useEffect(() => {}, []);

	return (
		<div>
			<SidePanel
				selectedSite={selectedSite}
				useSelectedSite={useSelectedSite}
			></SidePanel>
			<RecipesPanel
				selectedSite={selectedSite}
				useSelectedSite={useSelectedSite}
			></RecipesPanel>
		</div>
	);
};

export default MainDashboard;
