import LogInDashboard from "./LogInDashboard/LogInDashboard";
import SignInDashboard from "./SignInDashboard/SignInDashboard";

import photo from "../../assets/starting_dashboard_photo.jpg";

const StartingDashboard = () => {
	return (
		<main className="grid grid-cols-2 grid-rows-[auto_auto] bg-emerald-900 font-Comme md:grid-cols-2 md:grid-rows-[auto_auto]">
			<LogInDashboard></LogInDashboard>
			<SignInDashboard></SignInDashboard>
			<div className="col-span-2 ml-6 mt-5 flex flex-col md:col-span-1 md:row-start-2 lg:ml-16">
				<h1 className="mb-3 text-5xl text-emerald-50">Witaj w smakosferze</h1>
				<h2 className="text-xl text-emerald-50">
					Twojej wirtualnej książce z przepisami
				</h2>
				<img
					src={photo}
					alt="Zdjęcie przedstawiające ksążke z przepisami"
					className="w-3/4 saturate-50 md:w-10/12"
				/>
			</div>

			<div className="col-span-2 ml-6 mr-6 h-max text-emerald-50 md:row-span-1 md:row-start-3 lg:mx-16">
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
					mollitia veniam voluptatum rerum, facere minus doloremque dolores
					doloribus similique! Assumenda, atque voluptates reiciendis soluta,
					quisquam illo animi veniam omnis, corporis suscipit sapiente
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi ullam
					ipsum ut. Explicabo deserunt labore, iure libero quaerat quae tempora
					aperiam sit nam ipsum qui! Totam cumque repudiandae, labore eum, ipsa
					vero iure dolorum molestiae voluptate unde, quibusdam autem veritatis
					obcaecati? A eius optio, veritatis soluta similique magnam? Obcaecati
					architecto quis fuga dolorem maiores in deleniti provident corrupti
					corporis, tempora maxime rerum dignissimos ut consequatur atque!
					Facere provident assumenda eligendi autem ipsam, dolor voluptatum
					recusandae impedit fugiat, perspiciatis consectetur blanditiis nisi
					consequatur aut veniam quas corrupti accusantium vel adipisci
					laudantium officia. Sunt ipsum possimus voluptate, architecto nam
					suscipit beatae, quibusdam tempora, at a molestias rem soluta iure
					eligendi pariatur ipsa laudantium deserunt. Temporibus quidem, optio
					earum corporis culpa rem maiores nostrum in tempora ipsam sunt
					perspiciatis fugit, voluptates cumque officia dolor consectetur a
					dolores minus nulla nobis explicabo? Porro laboriosam quod expedita
					quo atque impedit magnam unde velit, architecto iusto eum libero
					numquam perspiciatis molestiae fuga quasi repellat enim doloribus qui
					a. Nam autem, odit quam facere deleniti ipsa eos tempora eveniet,
					voluptas consectetur amet magnam reprehenderit et vero eaque
					dignissimos architecto in dicta cum maiores rerum adipisci earum
					obcaecati. Vel exercitationem neque voluptatem, corporis voluptatibus
					eius odio inventore cumque error eos accusamus reiciendis at incidunt
					ducimus. Eligendi architecto, autem aperiam temporibus dolorum
					assumenda saepe necessitatibus, consectetur, in mollitia voluptas
					consequuntur quibusdam dicta? Tempora harum iste unde placeat error,
					et modi praesentium distinctio voluptatem reprehenderit ut iusto
					blanditiis! Dolorum consectetur adipisci ullam doloremque delectus
					officiis harum beatae minus, natus quisquam ratione quibusdam sint
					nostrum laboriosam voluptate omnis. Iusto numquam hic perspiciatis.
					Quasi labore illo nam! Incidunt quae voluptatum distinctio minima
					itaque impedit libero atque aspernatur porro omnis, iste corrupti
					obcaecati. Repellat laborum maiores molestias? Quas, dolore soluta?
					Eos molestiae nulla ducimus. Quidem odio est, perferendis magnam aut,
					eaque repellendus magni et repellat recusandae, repudiandae distinctio
					praesentium nam soluta pariatur similique? Adipisci dolores dolore
					sapiente quo aliquid corrupti! Veniam error illo, quasi mollitia
					minima, iusto, distinctio laborum ipsum necessitatibus ad enim
					assumenda dolorum omnis quas odio aperiam! Omnis tempore neque dolore
					ratione similique quibusdam iste, sunt blanditiis voluptatem itaque
					animi impedit dicta fugiat eos eius quaerat nihil quo? Adipisci hic
					quos dolorum, nam iure quod magnam vitae odio ipsa pariatur nobis,
					ipsum soluta corporis ullam atque accusamus quas alias ratione aut
					dignissimos sequi vero! Quis eum voluptates quae temporibus eius
					numquam quibusdam, quas nobis consectetur iure necessitatibus,
					repellendus modi harum explicabo neque nulla unde nesciunt aspernatur
					voluptas ea autem, eligendi amet et corporis? Molestias consectetur
					laboriosam nulla repudiandae temporibus provident quod nemo ullam
					accusamus atque tenetur aut, illo, aspernatur consequuntur eligendi
					fuga cumque rem officia laborum quis eos! Dicta explicabo quasi
					perspiciatis neque. Tempore, eum illum id repudiandae temporibus
					dignissimos facilis fugit odit delectus nihil quae asperiores placeat
					error quaerat numquam aut sapiente pariatur non quo amet, atque iure
					esse ea sequi. Aliquam, veniam! Odit quas unde ex ipsam architecto
					doloribus sequi facere sed esse corporis vel veritatis animi
					accusamus, molestiae ab quos expedita? Facilis, quibusdam dolorem quas
					officia autem fugit?
				</p>
			</div>
		</main>
	);
};

export default StartingDashboard;
