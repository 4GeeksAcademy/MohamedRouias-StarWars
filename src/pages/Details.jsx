import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

const Details = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { uid, type } = useParams(); //ID del contacto al que llamamos desde la url


	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
				if (!res.ok) throw new Error("No se pudo cargar los datos");

				const data = await res.json();
				setData(data.result.properties);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchDetails();
	}, [type, uid]);

	if (loading) return <div className="text-center mt-5">Cargando personaje...</div>;
	if (error) return <div className="text-danger text-center mt-5">{error}</div>;

	const isCharacter = type === "people";
	const isPlanet = type === "planets";
	const imgUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${type}/${uid}.jpg`;



	return (
		<div className="container mt-5">
			<Link to="/" className="btn btn-outline-secondary mb-3">← Volver</Link>
			<div className="row">
				<div className="col-md-5">
					<img
						src={imgUrl}
						alt={data.name}
						className="img-fluid"
						onError={(e) => {
							e.target.src = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg";
						}}
					/>
				</div>
				<div className="col-md-7">
					<h2>{data.name}</h2>
					<ul className="list-group list-group-flush mt-3">
						{isCharacter && (
							<>
								<li className="list-group-item"><strong>Género:</strong> {data.gender}</li>
								<li className="list-group-item"><strong>Año de nacimiento:</strong> {data.birth_year}</li>
								<li className="list-group-item"><strong>Color de ojos:</strong> {data.eye_color}</li>
								<li className="list-group-item"><strong>Color de pelo:</strong> {data.hair_color}</li>
								<li className="list-group-item"><strong>Color de piel:</strong> {data.skin_color}</li>
								<li className="list-group-item"><strong>Altura:</strong> {data.height} cm</li>
								<li className="list-group-item"><strong>Peso:</strong> {data.mass} kg</li>
							</>
						)}
						{isPlanet && (
							<>
								<li className="list-group-item"><strong>Clima:</strong> {data.climate}</li>
								<li className="list-group-item"><strong>Terreno:</strong> {data.terrain}</li>
								<li className="list-group-item"><strong>Diámetro:</strong> {data.diameter}km</li>
								<li className="list-group-item"><strong>Gravedad:</strong> {data.gravity}</li>
								<li className="list-group-item"><strong>Población:</strong> {data.population}</li>
								<li className="list-group-item"><strong>Príodo orbital:</strong> {data.orbital_period} días</li>
								<li className="list-group-item"><strong>Rotación:</strong> {data.rotation_period} kg</li>
							</>
						)}

					</ul>
				</div>
			</div>
		</div>
	);
};

export default Details;
