import { useState } from "react";
import AddRecipeModal from "../AddRecipeModal/AddRecipeModal";

const Button = props => {
	const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);

	const onClickHandler = () => {
		if (props.addRecipe) {
			setShowAddRecipeModal(true);
		} else {
			props.setSelectedSite(props.site);
		}
	};

	return (
		<div
			className="mx-3 my-5 flex cursor-pointer rounded border-b border-emerald-900 p-2 transition-all duration-300 hover:bg-emerald-100"
			onClick={onClickHandler}
		>
			{showAddRecipeModal && (
				<AddRecipeModal
					setShowAddRecipeModal={setShowAddRecipeModal}
				></AddRecipeModal>
			)}
			<img alt="ikonka" src={props.icon} className="mx-3 h-5 w-5"></img>
			<span>{props.text}</span>
		</div>
	);
};

export default Button;
