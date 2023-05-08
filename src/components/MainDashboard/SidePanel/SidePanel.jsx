import LogOutButton from "./LogOutButton/LogOutButton";

const SidePanel = props => {
	return (
		<div>
			<div>smakosfera</div>
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
};

export default SidePanel;
