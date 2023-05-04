import { firebaseApp } from "./services/config/firebaseConfig";

function App() {
	return (
		<>
			<h1>smakosfera</h1>
			{console.log(firebaseApp)}
		</>
	);
}

export default App;
