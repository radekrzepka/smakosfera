import { useReducer, useState, useContext } from "react";
import Input from "./Input/Input";
import addInputIcon from "./../../../../assets/add_input_icon.png";
import minusInputIcon from "./../../../../assets/minus_input_icon.png";
import { addNewRecipe } from "../../../../services/databaseServices";
import { AuthContext } from "../../../../context/auth-context";

const ingridentsReducer = (state, action) => {
	switch (action.type) {
		case "changeValue":
			state[action.index] = action.value;
			return [...state];
		case "newIngrident":
			return [...state, ""];
		case "removeIngrident":
			if (state.length > 1) return state.slice(0, -1);
			return state;
	}
};

const stepsReducer = (state, action) => {
	switch (action.type) {
		case "changeValue":
			state[action.index] = action.value;
			return [...state];
		case "newStep":
			return [...state, ""];
		case "removeStep":
			if (state.length > 1) return state.slice(0, -1);
			return state;
	}
};

const AddRecipeModal = props => {
	const [recipeName, setRecipeName] = useState("");
	const [file, setFile] = useState();
	const [ingridents, dispatchIngridents] = useReducer(ingridentsReducer, [""]);
	const [steps, dispatchSteps] = useReducer(stepsReducer, [""]);

	const authCtx = useContext(AuthContext);

	const handleFileChange = event => {
		if (event.target.files) setFile(event.target.files[0]);
	};

	const submitHandler = () => {
		const recipe = {
			author: authCtx.userData.uid,
			addDate: new Date(),
			ingredients: ingridents,
			name: recipeName,
			steps: steps,
			tags: [],
			usersFavorites: [],
		};
		addNewRecipe(recipe, file);
		console.log(recipeName, ingridents, steps, file);
	};

	const ingridentsList = ingridents.map((ingrident, index) => (
		<Input
			type="ingrident"
			index={index}
			key={index}
			change={dispatchIngridents}
		></Input>
	));

	const stepsList = steps.map((ingrident, index) => (
		<Input type="step" index={index} key={index} change={dispatchSteps}></Input>
	));

	return (
		<div className="fixed left-0 top-0 z-10 grid h-full w-full place-items-center gap-1 bg-black/60 px-5 lg:px-32">
			<form
				className="mt-10 flex h-max w-full flex-col items-center overflow-y-scroll rounded-md bg-emerald-50 p-5"
				onSubmit={submitHandler}
			>
				<p className="mb-3">Dodaj swój nowy przepis (maks 20 znaków)</p>
				<label htmlFor="name">Podaj nazwę dania:</label>
				<input
					className="w-3/4 rounded border border-emerald-900"
					id="name"
					type="text"
					onChange={event => setRecipeName(event.target.value)}
				></input>
				<div className="flex w-full flex-col items-center">
					<div className="">
						<span className="mb-3 mr-3">Dodaj potrzebne składniki:</span>
						<img
							src={addInputIcon}
							alt="Ikona dodawania nowego składnika"
							onClick={() => dispatchIngridents({ type: "newIngrident" })}
							className="mr-3 inline w-5"
						/>
						<img
							src={minusInputIcon}
							alt="Ikona usuwnia składnika"
							onClick={() => dispatchIngridents({ type: "removeIngrident" })}
							className="inline w-5"
						/>
					</div>
					{ingridentsList}
				</div>

				<div>
					<span className="mb-3 mr-3">Dodaj listę kroków:</span>
					<img
						src={addInputIcon}
						alt="Ikona dodawania nowego kroku"
						onClick={() => dispatchSteps({ type: "newStep" })}
						className="mr-3 inline w-5"
					/>
					<img
						src={minusInputIcon}
						alt="Ikona usuwnia kroku"
						onClick={() => dispatchSteps({ type: "removeStep" })}
						className="inline w-5"
					/>
				</div>
				{stepsList}
				<div>
					<label htmlFor="file">Dodaj zdjęcie (w formacie .jpg):</label>
					<input
						accept=".jpg"
						id="file"
						type="file"
						onChange={handleFileChange}
					></input>
				</div>

				<button
					type="button"
					className="mt-3 w-max rounded bg-emerald-900 px-8 py-1 text-emerald-50"
					onClick={submitHandler}
				>
					Dodaj przepis
				</button>
			</form>
		</div>
	);
};

export default AddRecipeModal;
