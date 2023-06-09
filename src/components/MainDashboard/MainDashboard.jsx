import { useEffect, useState, useContext } from "react";
import SidePanel from "./SidePanel/SidePanel";
import RecipesPanel from "./RecipesPanel/RecipesPanel";
import { RecipesContextProvider } from "../../context/recipes-context";
import { checkIfTheUserHasUsername } from "../../services/databaseServices";
import UsernameModal from "./UsernameModal/UsernameModal";
import { AuthContext } from "../../context/auth-context";
import { TagsContextProvider } from "../../context/tags-context";

const MainDashboard = () => {
	const [selectedSite, setSelectedSite] = useState("home");
	const [userHasUsername, setUserHasUsername] = useState(true);

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		checkIfTheUserHasUsername(authCtx.userData.uid).then(result => {
			setUserHasUsername(result);
			if (!result) {
				setSelectedSite("none");
				setUserHasUsername(false);
			}
		});
	});

	return (
		<RecipesContextProvider>
			<TagsContextProvider>
				<main className="grid min-h-screen grid-cols-1 bg-emerald-900 lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_4fr]">
					{!userHasUsername && (
						<UsernameModal
							setUserHasUsername={setUserHasUsername}
							setSelectedSite={setSelectedSite}
						></UsernameModal>
					)}
					<SidePanel
						userHasUsername={userHasUsername}
						selectedSite={selectedSite}
						setSelectedSite={setSelectedSite}
					></SidePanel>

					<RecipesPanel
						selectedSite={selectedSite}
						setSelectedSite={setSelectedSite}
					></RecipesPanel>
				</main>
			</TagsContextProvider>
		</RecipesContextProvider>
	);
};

export default MainDashboard;
