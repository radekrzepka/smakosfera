import { useContext, useState } from "react";
import {
	changeUsername,
	checkIfUserNameInDb,
} from "../../../services/databaseServices";
import { AuthContext } from "../../../context/auth-context";

const UsernameModal = props => {
	const [username, setUsername] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const authCtx = useContext(AuthContext);

	const submitHandler = event => {
		event.preventDefault();

		if (username.trim().length !== 0 && username.trim().length <= 20) {
			checkIfUserNameInDb(username).then(result => {
				if (!result) {
					changeUsername(authCtx.userData.uid, username);
					props.setUserHasUsername(true);
					props.setSelectedSite("home");
				} else {
					setErrorMessage("Podana nazwa użytkownika jest już zajęta");
				}
			});
		} else {
			setErrorMessage("Twoja nazwa użytkownika musi mieć od 1 do 20 znaków");
		}
	};

	return (
		<div className="absolute left-0 top-0 z-10 flex h-full w-full justify-center bg-black/60">
			<form
				className="m-3 mt-10 flex h-max flex-col rounded-md bg-emerald-50 p-5"
				onSubmit={submitHandler}
			>
				<label htmlFor="username" className="mb-3">
					Jako że jesteś pierwszy raz na stornie, podaj swoją nazwę użytkownika
					(maks 20 znaków)
				</label>
				<input
					className="w-1/2 rounded border border-emerald-900"
					id="username"
					type="text"
					onChange={event => setUsername(event.target.value)}
				></input>
				<button
					type="button"
					className="mt-3 w-max rounded bg-emerald-900 px-8 py-1 text-emerald-50"
					onClick={submitHandler}
				>
					Ustaw
				</button>
				{setErrorMessage && <p>{errorMessage}</p>}
			</form>
		</div>
	);
};

export default UsernameModal;
