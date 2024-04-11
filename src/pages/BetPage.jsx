import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContext";
import { getGames, endGames } from "../services/gameApi";

export default function BetPage() {
	const { config: userId } = useContext(AuthContext);
	const [games, setGames] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const games = await getGames();
				setGames(games);
			} catch (error) {
				toast("Error fetching games!");
			}
		};
		fetchData();
	}, []);

	async function end() {
		try {
			const eg = await endGames();
			console.log(eg);
		} catch (error) {
			toast("Error!");
		}
	}

	return (
		<>
			Página de Apostas!
			{userId}
			<button onClick={() => end()}>End games</button>
			{games.map((game) => (
				<div key={game.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
					<h2>{game.name}</h2>
				</div>
			))}
		</>
	)
}