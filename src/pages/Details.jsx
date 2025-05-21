import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

const Details = () => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { uid } = useParams(); //ID del contacto al que llamamos desde la url


  useEffect(() => {
		const fetchCharacterDetails = async () => {
			try {
				const res = await fetch(`https://www.swapi.tech/api/people/${uid}`);
				if (!res.ok) throw new Error("No se pudo cargar el personaje");

				const data = await res.json();
				setCharacter(data.result.properties);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCharacterDetails();
	}, [uid]);

	if (loading) return <div className="text-center mt-5">Cargando personaje...</div>;
	if (error) return <div className="text-danger text-center mt-5">{error}</div>;

	return (
		<div className="container mt-5">
			<Link to="/" className="btn btn-outline-secondary mb-3">← Volver</Link>
			<div className="row">
				<div className="col-md-5">
					<img
						src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${uid}.jpg`}
            alt={character.name}
						className="img-fluid"
						onError={(e) => {
							e.target.src = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg";
						}}
					/>
				</div>
				<div className="col-md-7">
					<h2>{character.name}</h2>
					<ul className="list-group list-group-flush mt-3">
						<li className="list-group-item"><strong>Género:</strong> {character.gender}</li>
						<li className="list-group-item"><strong>Año de nacimiento:</strong> {character.birth_year}</li>
						<li className="list-group-item"><strong>Color de ojos:</strong> {character.eye_color}</li>
						<li className="list-group-item"><strong>Color de pelo:</strong> {character.hair_color}</li>
						<li className="list-group-item"><strong>Color de piel:</strong> {character.skin_color}</li>
						<li className="list-group-item"><strong>Altura:</strong> {character.height} cm</li>
						<li className="list-group-item"><strong>Peso:</strong> {character.mass} kg</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Details
