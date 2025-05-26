import { Link } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">
						<img src="src/assets/img/icons8-estrella-de-la-muerte-32.png" alt="" />
					</span>
				</Link>
				<div className="dropdown ms-auto">
					<button
						className="btn btn-secondary dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favoritos ({store.favorites.length})
					</button>

					<ul class="dropdown-menu dropdown-menu-end">
						{store.favorites.length === 0 && (
							<li><span className="dropdown-item text-muted">Sin Favotiros</span></li>
						)}
						{store.favorites.map((fav, index) => (
							<li
								key={index}
								className="d-flex justify-content-between align-items-center px-3"
							>
								<Link
									className="dropdown-item"
									to={`/details/${fav.type}/${fav.uid}`}
								>
									{fav.name}
								</Link>
								<button
									className="btn-close"
									onClick={() =>
										dispatch({
											type: "remove_favorite",
											payload: fav
										})
									}
								>
								</button>

							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};