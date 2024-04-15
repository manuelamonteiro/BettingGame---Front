import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContext";
import { getGames, endGames } from "../services/gameApi";
import CardGame from "../components/CardGame";

export default function BetPage() {
	const { config: userId } = useContext(AuthContext);
	const [games, setGames] = useState([]);
	const [userBets, setUserBets] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const gamesData = await getGames();
				setGames(gamesData);
			} catch (error) {
				toast("Error fetching games!");
			}
		};
		fetchData();
	}, []);

	async function end() {
		try {
			await endGames();
			const updatedGames = await getGames();
			setGames(updatedGames);
		} catch (error) {
			toast("Error!");
		}
	}

	async function getUserBets() {
		try {
			const userBetsData = await getBetsByUser('manuzinha', '123456789', userId);
			setUserBets(userBetsData);
			console.log(userBetsData);
		} catch (error) {
			toast("Error!");
		}
	}

	return (
		<>
			<h1>Página de Apostas!</h1>
			<button onClick={() => end()}>End games</button>
			<button onClick={() => getUserBets()}>User Bets</button>
			{games.map((game) => (
				<div key={game.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
					<CardGame game={game} />
				</div>
			))}
		</>
	)
}