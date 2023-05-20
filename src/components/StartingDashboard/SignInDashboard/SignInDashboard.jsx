import { useContext, useState, useReducer } from "react";
import { createUser } from "../../../services/authServices";
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

	const isDisabled = !(emailState.isValid && passwordState.isValid);

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
						setErrorMessage("Na podany mail zostało już stworzone konto");
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
		<div className="text-emerald-5 col-span-2 row-start-3 m-5 mx-6 md:col-start-2 md:row-start-2 md:ml-0 lg:mr-14">
			<form className="h-max rounded-xl bg-emerald-50 p-3 text-emerald-900 ">
				<h3 className="mb-3 text-center text-2xl font-bold">
					Dołącz do smakosfery
				</h3>
				<div className="mb-4 w-full">
					<label htmlFor="signInEmail">Podaj e-mail:</label>
					<input
						className="mb-3 w-full rounded border border-emerald-900 bg-emerald-50 text-black"
						type="text"
						id="signInEmail"
						onChange={event =>
							dispatchEmail({ type: "changeValue", value: event.target.value })
						}
					/>
				</div>
				<div className="mb-4 w-full">
					<label htmlFor="signInPassword">
						Podaj hasło (minimum 6 znaków):
					</label>
					<input
						className="w-full rounded border border-emerald-900 bg-emerald-50 text-black"
						type="password"
						id="signInPassword"
						onChange={event =>
							dispatchPassword({
								type: "changeValue",
								value: event.target.value,
							})
						}
					/>
				</div>
				<button
					type="button"
					className={`mt-5 w-max rounded border border-emerald-900 p-3 ${
						isDisabled
							? "border-[#afc2ab] bg-[#afc2ab] text-black"
							: "border-emerald-900 bg-emerald-900 text-emerald-50"
					}`}
					onClick={submitHandler}
					disabled={isDisabled}
				>
					Zarejestruj się
				</button>
				{isDisabled && firstTimeClickedButton && <p>{errorMessage}</p>}
			</form>
			<p className="mb-3 mt-6 text-emerald-50">
				Smakosfera jest portalem dla każdego, kto lubi gotować oraz dzielić się
				swoimi pomysłami. Na portalu możesz:
			</p>
			<ol className="ml-3 mt-3 list-inside list-disc text-emerald-50">
				<li className="mb-1">
					Przeglądać przepisy dodane przez innych użytkowników
				</li>
				<li className="mb-1">Dodawać swoje przepisy</li>
				<li className="mb-1">
					Polubić wybrarane przepisy, aby swoje ulubione przepisy mieć w jednym
					miejscu
				</li>
				<li className="mb-1">
					Szukać przepisów, bo najrózniejszych tagach takich jak: dania
					wegetrańskie, dania obiadowe, czy dania na szybko{" "}
				</li>
			</ol>
			<p className="mb-3 text-emerald-50">
				Aby dołączyć do smakosfery wystarczy stworzyć konto, wybrać swoja nazwę
				użytkownika i gotowe!
			</p>
		</div>
	);
};

export default SignInDashboard;
