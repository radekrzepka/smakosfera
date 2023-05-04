import { useContext, useState } from "react";
import { logIn } from "../../../services/firebaseServices";
import { AuthContext } from "../../../context/auth-context";

const LogInDashboard = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [correctDataUser, setCorrectDataUser] = useState(true);

	const authCtx = useContext(AuthContext);

	const submitHandler = event => {
		event.preventDefault();

		logIn(email, password)
			.then(user => {
				setCorrectDataUser(true);
				authCtx.logInHandler(user);
			})

			.catch(() => {
				setCorrectDataUser(false);
			});
	};

	return (
		<div>
			<h1>Zaloguj się</h1>
			<form>
				<label htmlFor="logInEmail">Podaj e-mail:</label>
				<input
					type="text"
					id="logInEmail"
					onChange={event => setEmail(event.target.value)}
				/>
				<label htmlFor="logInPassword">Podaj hasło:</label>
				<input
					type="password"
					id="logInPassword"
					onChange={event => setPassword(event.target.value)}
				/>
				<input type="submit" value="Zaloguj się" onClick={submitHandler} />
			</form>
			{!correctDataUser && <p>Podaj poprawne dane do logowania</p>}
		</div>
	);
};

export default LogInDashboard;
