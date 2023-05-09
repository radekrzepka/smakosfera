import { useContext, useEffect, useState } from "react";
import LogOutButton from "./LogOutButton/LogOutButton";
import { AuthContext } from "../../../context/auth-context";
import { getUserUsernameByGivenId } from "../../../services/databaseServices";

const SidePanel = props => {
	const [userName, setUserName] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		getUserUsernameByGivenId(authCtx.userData.uid).then(data => {
			setUserName(data);
			setIsLoaded(true);
		});
	}, []);

	if (isLoaded) {
		return (
			<div>
				<p>Witaj {userName} w smakosfera</p>
				<div onClick={() => props.setSelectedSite("home")}>dom</div>
				<div>szukaj</div>
				<div>dodaj przepis</div>
				<div onClick={() => props.setSelectedSite("myRecipes")}>
					moje przepisy
				</div>
				<div onClick={() => props.setSelectedSite("favorite")}>ulubione</div>
				<LogOutButton></LogOutButton>
			</div>
		);
	}
};

export default SidePanel;
