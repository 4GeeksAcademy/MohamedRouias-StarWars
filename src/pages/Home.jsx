import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

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


		// Cargamos los planetas si no hay ninguno en la store
		const fetchPlanets = async () => {
			try {
				const res = await fetch("https://www.swapi.tech/api/planets");
				if (!res.ok) throw new Error("Error al cargar planeta");
				const data = await res.json();

				// Guardamos solo el array de los personajes
				dispatch({ type: "set_planets", payload: data.results });

			}
			catch (err) {
				console.error("Error cargando planets:", err);
			}
		};

		//Solo hacemos la petició  si aún no hay personajes en la store
		if (store.planets.length === 0) {
			fetchPlanets();
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
									onError={(e) => {
										e.target.src = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg"
									}}
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
			<div className="planets-section container mt-5">
				<h1 className="text-danger mb-4">PLANETS</h1>
				<div className="row flex-nowrap overflow-auto">
					{store.planets.map((plan) => (
						<div className="col-3 cards-carousel" key={plan.uid}>
							<div className="card" style={{ width: "18rem" }}>
								<img
									src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${plan.uid}.jpg`}
									className="card-img-top"
									alt={plan.name}
									onError={(e) => {
										e.target.src = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg"
									}}
									style={{ height: "350px", objectFit: "cover" }}
								/>

								<div className="card-body">
									<h5 className="card-title">{plan.name}</h5>
									<Link to={`/details/${plan.uid}`} className="btn btn-primary">
										Learn more!
									</Link>
								</div>
							</div>
						</div>
					))}

				</div>
			</div>
		</div>
	);
}; 