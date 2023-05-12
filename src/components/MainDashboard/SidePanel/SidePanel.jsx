import { useContext, useEffect, useState } from "react";
import LogOutButton from "./LogOutButton/LogOutButton";
import { AuthContext } from "../../../context/auth-context";
import { getUserUsernameByGivenId } from "../../../services/databaseServices";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import Button from "./Button/Button";

import forkIcon from "./../../../assets/fork_icon.png";
import heartIcon from "./../../../assets/heart_icon.png";
import homeIcon from "./../../../assets/home_icon.png";
import addIcon from "./../../../assets/add_icon.png";

const SidePanel = props => {
	const [userName, setUserName] = useState("");
	const [isLoaded, setIsLoaded] = useState(false);
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		getUserUsernameByGivenId(authCtx.userData.uid).then(data => {
			setUserName(data);
			setIsLoaded(true);
		});
	}, [authCtx.userData.uid, props.userHasUsername]);

	if (isLoaded) {
		return (
			<div className="bg-emerald-900 lg:min-h-screen">
				<nav className=" m-3 flex h-max flex-col rounded bg-emerald-50">
					<p className="my-5 ml-6 text-2xl">Witaj {userName}</p>
					<Button
						text="Dom"
						site="home"
						setSelectedSite={props.setSelectedSite}
						icon={homeIcon}
					/>
					<Button
						text="Moje przepisy"
						site="myRecipes"
						icon={forkIcon}
						setSelectedSite={props.setSelectedSite}
					/>
					<Button
						text="Ulubione"
						site="favorite"
						icon={heartIcon}
						setSelectedSite={props.setSelectedSite}
					/>

					<Button text="Dodaj przepis" icon={addIcon} />
					<LogOutButton></LogOutButton>
				</nav>
			</div>
		);
	} else {
		return <LoadingScreen></LoadingScreen>;
	}
};

export default SidePanel;
