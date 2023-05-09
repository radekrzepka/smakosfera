import { useContext, useReducer, useState } from "react";
import { logIn } from "../../../services/authServices";
import { AuthContext } from "../../../context/auth-context";
import { validateEmail } from "../validateEmail";

const emailReducer = (state, action) => {
	switch (action.type) {
		case "changeValue":
			return {
				value: action.value,
				isValid: validateEmail(action.value),
			};
		case "wrongEmail":
			return {
				...state,
				isValid: false,
			};
	}
};

const passwordReducer = (state, action) => {
	switch (action.type) {
		case "changeValue":
			return {
				value: action.value,
				isValid: action.value.length >= 6,
			};
		case "wrongPassword":
			return {
				...state,
				isValid: false,
			};
	}
};

const LogInDashboard = () => {
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: "",
		isValid: false,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: false,
	});

	const [firstTimeClickedButton, setFirstTimeClickedButton] = useState(false);

	const authCtx = useContext(AuthContext);

	const submitHandler = event => {
		event.preventDefault();
		setFirstTimeClickedButton(true);

		logIn(emailState.value, passwordState.value)
			.then(user => {
				authCtx.logInHandler(user);
			})

			.catch(erorr => {
				switch (erorr.message) {
					case "Firebase: Error (auth/wrong-password).":
						dispatchPassword({ type: "wrongPassword" });
						break;
					case "Firebase: Error (auth/user-not-found).":
						dispatchEmail({ type: "wrongEmail" });
						break;
				}
			});
	};

	return (
		<form>
			<label htmlFor="logInEmail">Podaj e-mail:</label>
			<input
				type="text"
				id="logInEmail"
				onChange={event =>
					dispatchEmail({ type: "changeValue", value: event.target.value })
				}
			/>
			<label htmlFor="logInPassword">Podaj hasło:</label>
			<input
				type="password"
				id="logInPassword"
				onChange={event =>
					dispatchPassword({ type: "changeValue", value: event.target.value })
				}
			/>
			<input
				type="submit"
				value="Zaloguj się"
				onClick={submitHandler}
				disabled={!(emailState.isValid && passwordState.isValid)}
			/>
			{!(emailState.isValid && passwordState.isValid) &&
				firstTimeClickedButton && <p>Podaj poprawne dane do logowania</p>}
		</form>
	);
};

export default LogInDashboard;
