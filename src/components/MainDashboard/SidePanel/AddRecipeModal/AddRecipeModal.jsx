import { useReducer, useState, useContext } from "react";
import Input from "./Input/Input";
import addInputIcon from "./../../../../assets/add_input_icon.png";
import minusInputIcon from "./../../../../assets/minus_input_icon.png";
import closeIcon from "./../../../../assets/close_icon.png";
import {
	addNewRecipe,
	getAllTags,
} from "../../../../services/databaseServices";
import { AuthContext } from "../../../../context/auth-context";
import { useEffect } from "react";
import Tag from "./Tag/Tag";

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

const tagsReducer = (state, action) => {
	switch (action.type) {
		case "initTags":
			state = action.dbTags.map(tag => {
				return {
					...tag,
					isChosen: false,
				};
			});
			return state;
		case "changeIsChosen":
			return state.map((tag, index) => {
				if (index === action.index) {
					return {
						...tag,
						isChosen: !tag.isChosen,
					};
				}
				return tag;
			});
	}
};

const AddRecipeModal = props => {
	const [recipeName, setRecipeName] = useState("");
	const [file, setFile] = useState();
	const [ingridents, dispatchIngridents] = useReducer(ingridentsReducer, [""]);
	const [steps, dispatchSteps] = useReducer(stepsReducer, [""]);
	const [tags, dispatchTags] = useReducer(tagsReducer, []);

	const authCtx = useContext(AuthContext);

	const handleFileChange = event => {
		if (event.target.files) setFile(event.target.files[0]);
	};

	const submitHandler = () => {
		const tagsToDb = tags.filter(tag => tag.isChosen).map(tag => tag.id);

		const recipe = {
			author: authCtx.userData.uid,
			addDate: new Date(),
			ingredients: ingridents,
			name: recipeName,
			steps: steps,
			tags: tagsToDb,
			usersFavorites: [],
		};

		addNewRecipe(recipe, file);
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

	useEffect(() => {
		getAllTags().then(dbTags => {
			dispatchTags({ type: "initTags", dbTags: dbTags });
		});
	}, [getAllTags, dispatchTags]);

	const tagsList = tags.map((tag, index) => (
		<Tag
			key={tag.id}
			isChosen={tag.isChosen}
			changeIsChosen={() =>
				dispatchTags({ type: "changeIsChosen", index: index })
			}
		>
			{tag.name}
		</Tag>
	));

	return (
		<div className="fixed left-0 top-0 z-10 grid h-full w-full place-items-center gap-1 bg-black/60  lg:px-32">
			<form
				className="relative mt-10 flex h-max w-full flex-col items-center rounded-md bg-emerald-50 p-5"
				onSubmit={submitHandler}
			>
				<img
					src={closeIcon}
					alt="Ikona zamknięcie okna z doawaniem przepisu"
					className="absolute right-0 top-0 w-8 cursor-pointer"
					onClick={props.closeModalHandler}
				/>
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
							className="mr-3 inline w-5 cursor-pointer"
						/>
						<img
							src={minusInputIcon}
							alt="Ikona usuwnia składnika"
							onClick={() => dispatchIngridents({ type: "removeIngrident" })}
							className="inline w-5 cursor-pointer"
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
						className="mr-3 inline w-5 cursor-pointer"
					/>
					<img
						src={minusInputIcon}
						alt="Ikona usuwnia kroku"
						onClick={() => dispatchSteps({ type: "removeStep" })}
						className="inline w-5 cursor-pointer"
					/>
				</div>
				{stepsList}

				<div>
					<p className="text-center">Dodaj tagi: </p>
					<ul className="flex flex-wrap items-center justify-center">
						{tagsList}
					</ul>
				</div>

				<div className="grid place-items-center">
					<label className="block" htmlFor="file">
						Dodaj zdjęcie (w formacie .jpg):
					</label>
					<input
						className="w-max"
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