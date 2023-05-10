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
		<form className="col-span-2 row-span-1 mx-6 mb-4 flex h-max flex-col items-center justify-evenly rounded-b-lg bg-emerald-50 p-2 md:flex-row lg:mx-14">
			<h1 className="font-JetBrainsMono text-2xl font-bold text-emerald-900">
				Smakosfera
			</h1>
			<div className="flex flex-col items-center justify-center md:flex-row md:items-center xl:items-baseline xl:justify-around">
				<div className="mx-1 mb-3 flex items-center justify-center md:mx-5 md:mb-0 md:grid md:place-items-center xl:flex">
					<label htmlFor="logInEmail">Podaj e-mail:</label>
					<input
						className="ml-2 max-w-full rounded border border-emerald-900 bg-emerald-50 p-1 xl:ml-2"
						type="text"
						id="logInEmail"
						onChange={event =>
							dispatchEmail({ type: "changeValue", value: event.target.value })
						}
					/>
				</div>
				<div className="mx-1 mb-3 flex items-center justify-center md:mx-5 md:mb-0 md:grid md:place-items-center xl:flex">
					<label htmlFor="logInPassword">Podaj hasło:</label>
					<input
						className="ml-2 rounded border border-emerald-900 bg-emerald-50 p-1 xl:ml-2"
						type="password"
						id="logInPassword"
						onChange={event =>
							dispatchPassword({
								type: "changeValue",
								value: event.target.value,
							})
						}
					/>
				</div>
				<button
					className="w-fit rounded border border-emerald-900 bg-emerald-900 px-6 py-3 text-emerald-50 xl:px-8 xl:py-3"
					type="button"
					onClick={submitHandler}
				>
					Zaloguj się
				</button>
				{!(emailState.isValid && passwordState.isValid) &&
					firstTimeClickedButton && (
						<p className="text-xs md:absolute md:top-3/4">
							Podaj poprawne dane do logowania
						</p>
					)}
			</div>
		</form>
	);
};

export default LogInDashboard;
