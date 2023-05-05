import { useEffect, useState } from "react";
import {
	checkIfUsernameInDb,
	getAllRecipesTags,
} from "../../services/firebaseServices";
import SidePanel from "./SidePanel/SidePanel";
import RecipesPanel from "./RecipesPanel/RecipesPanel";

const MainDashboard = () => {
	const [selectedSite, useSelectedSite] = useState("");

	useEffect(() => {
		checkIfUsernameInDb("traphone").then(data => {
			console.log(data);
		});
		getAllRecipesTags().then(data => {
			console.log(data);
		});
	}, []);

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
