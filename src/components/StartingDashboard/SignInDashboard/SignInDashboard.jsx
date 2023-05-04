import { useContext, useState } from "react";
import { createUser } from "../../../services/firebaseServices";
import { AuthContext } from "../../../context/auth-context";

const SignInDashboard = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [correctDataUser, setCorrectDataUser] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	const authCtx = useContext(AuthContext);

	const submitHandler = event => {
		event.preventDefault();

		createUser(email, password)
			.then(user => {
				authCtx.logInHandler(user);
				setCorrectDataUser(true);
			})

			.catch(error => {
				setCorrectDataUser(false);
				console.log(error.message);

				switch (error.message) {
					case "Firebase: Error (auth/email-already-in-use).":
						setErrorMessage("Na podany mail został już stworzone konto");
						break;

					case "Firebase: Password should be at least 6 characters (auth/weak-password).":
						setErrorMessage("Hasło powinno mieć conajmniej 6 znaków");
						break;

					case "Firebase: Error (auth/invalid-email).":
						setErrorMessage("Podaj poprawny adres email");
						break;

					default:
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
					onChange={event => setEmail(event.target.value)}
				/>
				<label htmlFor="signInPassword">Podaj hasło:</label>
				<input
					type="password"
					id="signInPassword"
					onChange={event => setPassword(event.target.value)}
				/>
				<input type="submit" value="Zarejestruj się" onClick={submitHandler} />
			</form>
			<p>{!correctDataUser ? errorMessage : ""}</p>
		</div>
	);
};

export default SignInDashboard;
