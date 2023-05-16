import { useState } from "react";
import AddRecipeModal from "../AddRecipeModal/AddRecipeModal";
import { createPortal } from "react-dom";

const Button = props => {
	const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);

	const onClickHandler = () => {
		if (props.addRecipe && !showAddRecipeModal) {
			setShowAddRecipeModal(true);
		} else if (!props.addRecipe) {
			props.setSelectedSite(props.site);
		}
	};

	const closeModalHandler = () => {
		setShowAddRecipeModal(false);
	};

	return (
		<button
			className="mx-3 my-5 flex cursor-pointer rounded border-b border-emerald-900 p-2 transition-all duration-300 hover:bg-emerald-100"
			onClick={onClickHandler}
		>
			{showAddRecipeModal &&
				createPortal(
					<AddRecipeModal
						closeModalHandler={closeModalHandler}
					></AddRecipeModal>,
					document.body
				)}
			<img alt="ikonka" src={props.icon} className="mx-3 h-5 w-5"></img>
			<span>{props.text}</span>
		</button>
	);
};

export default Button;
