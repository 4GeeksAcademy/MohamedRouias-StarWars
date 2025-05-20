import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();


	useEffect(() => {
		// Cargamos los personajes si no hay ninguno en la store
		const fetchCharacters = async () => {
			try {
				const res = await fetch("https://www.swapi.tech/api/people");
				if (!res.ok) throw new Error("Error al cargar personaje");
				const data = await res.json();

				// Guardamos solo el array de los personajes
				dispatch({ type: "set_characters", payload: data.results });

			}
			catch (err) {
				console.error("Error cargando personajes:", err);
			}
		};

		//Solo hacemos la petició  si aún no hay personajes en la store
		if (store.characters.length === 0) {
			fetchCharacters();
		}

	}, []);









	return (
		<div className="text-center mt-5">
			<div className="characters-section container">
				<h1 className="text-danger mb-4">CHARACTERS</h1>
				<div className="row flex-nowrap overflow-auto">
					{store.characters.map((char) => (
						<div className="col-3 cards-carousel" key={char.uid}>
							<div className="card" style={{ width: "18rem" }}>
								<img
									src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${char.uid}.jpg`}
									className="card-img-top"
									alt={char.name}
									style={{ height: "350px", objectFit: "cover" }}
								/>

								<div className="card-body">
									<h5 className="card-title">{char.name}</h5>
									<Link to={`/details/${char.uid}`} className="btn btn-primary">
										Learn more!
									</Link>
								</div>
							</div>
						</div>
					))}

				</div>


			</div>
			<div className="planets-section container">
				
			</div>
		</div>
	);
}; 