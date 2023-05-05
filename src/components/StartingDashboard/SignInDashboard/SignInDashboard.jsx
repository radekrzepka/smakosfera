import { useContext, useState, useReducer } from "react";
import { createUser } from "../../../services/firebaseServices";
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

const SignInDashboard = () => {
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: "",
		isValid: false,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: false,
	});

	const [errorMessage, setErrorMessage] = useState("");
	const [firstTimeClickedButton, setFirstTimeClickedButton] = useState(false);

	const authCtx = useContext(AuthContext);

	const submitHandler = event => {
		event.preventDefault();
		setFirstTimeClickedButton(true);

		createUser(emailState.value, passwordState.value)
			.then(user => {
				authCtx.logInHandler(user);
			})

			.catch(error => {
				switch (error.message) {
					case "Firebase: Error (auth/email-already-in-use).":
						setErrorMessage("Na podany mail został już stworzone konto");
						dispatchEmail({ type: "wrongEmail" });
						break;

					case "Firebase: Password should be at least 6 characters (auth/weak-password).":
						setErrorMessage("Hasło powinno mieć conajmniej 6 znaków");
						dispatchPassword({ type: "wrongPassword" });
						break;

					case "Firebase: Error (auth/invalid-email).":
						setErrorMessage("Podaj poprawny adres email");
						dispatchEmail({ type: "wrongEmail" });
						break;
				}
			});
	};

	return (
		<div>
			<h1>Zarejestruj się</h1>
			<form>
				<label htmlFor="signInEmail">Podaj e-mail:</label>
				<input
					type="text"
					id="signInEmail"
					onChange={event =>
						dispatchEmail({ type: "changeValue", value: event.target.value })
					}
				/>
				<label htmlFor="signInPassword">Podaj hasło:</label>
				<input
					type="password"
					id="signInPassword"
					onChange={event =>
						dispatchPassword({ type: "changeValue", value: event.target.value })
					}
				/>
				<input
					type="submit"
					value="Zarejestruj się"
					onClick={submitHandler}
					disabled={!(emailState.isValid && passwordState.isValid)}
				/>
			</form>
			{!(emailState.isValid && passwordState.isValid) &&
				firstTimeClickedButton && <p>{errorMessage}</p>}
		</div>
	);
};

export default SignInDashboard;
