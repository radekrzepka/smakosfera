import LogInDashboard from "./LogInDashboard/LogInDashboard";
import SignInDashboard from "./SignInDashboard/SignInDashboard";

import photo from "../../assets/Starting_Dashboard_photo.jpg";

const StartingDashboard = () => {
	return (
		<main className="grid grid-cols-2 grid-rows-[auto_auto] bg-emerald-900 font-Comme md:grid-cols-2 md:grid-rows-[auto_auto]">
			<LogInDashboard></LogInDashboard>
			<SignInDashboard></SignInDashboard>
			<div className="col-span-2 my-5 ml-14 md:col-span-1 md:row-start-2">
				<h1 className="mb-3 text-5xl text-emerald-50">Witaj w smakosferze</h1>
				<h2 className="mb-3 text-xl text-emerald-50">
					Twojej wirtualnej książce z przepisami
				</h2>
				<img
					src={photo}
					alt="Zdjęcie przedstawiające ksążke z przepisami"
					className="w-3/4"
				/>
			</div>
			<div className="col-span-2 ml-14 mr-12 h-max text-emerald-50 md:row-span-1 md:row-start-3">
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
					mollitia veniam voluptatum rerum, facere minus doloremque dolores
					doloribus similique! Assumenda, atque voluptates reiciendis soluta,
					quisquam illo animi veniam omnis, corporis suscipit sapiente
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
					mollitia veniam voluptatum rerum, facere minus doloremque dolores
					doloribus similique! Assumenda, atque voluptates reiciendis soluta,
					quisquam illo animi veniam omnis, corporis suscipit sapiente
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
					mollitia veniam voluptatum rerum, facere minus doloremque dolores
					doloribus similique! Assumenda, atque voluptates reiciendis soluta,
					quisquam illo animi veniam omnis, corporis suscipit sapiente
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
					mollitia veniam voluptatum rerum, facere minus doloremque dolores
					doloribus similique! Assumenda, atque voluptates reiciendis soluta,
					quisquam illo animi veniam omnis, corporis suscipit sapiente
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
					mollitia veniam voluptatum rerum, facere minus doloremque dolores
					doloribus similique! Assumenda, atque voluptates reiciendis soluta,
					quisquam illo animi veniam omnis, corporis suscipit sapiente
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
					mollitia veniam voluptatum rerum, facere minus doloremque dolores
					doloribus similique! Assumenda, atque voluptates reiciendis soluta,
					quisquam illo animi veniam omnis, corporis suscipit sapiente
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
					mollitia veniam voluptatum rerum, facere minus doloremque dolores
					doloribus similique! Assumenda, atque voluptates reiciendis soluta,
					quisquam illo animi veniam omnis, corporis suscipit sapiente
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
					mollitia veniam voluptatum rerum, facere minus doloremque dolores
					doloribus similique! Assumenda, atque voluptates reiciendis soluta,
					quisquam illo animi veniam omnis, corporis suscipit sapiente
				</p>
			</div>
		</main>
	);
};

export default StartingDashboard;
