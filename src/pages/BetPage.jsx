import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContext";
import { getGames, endGames } from "../services/gameApi";
import CardGame from "../components/CardGame";
import { BetPageContainer } from "../assets/BetPage-style";

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
			const userBetsData = await getBetsByUser('manuzinhah', '123456789', userId);
			setUserBets(userBetsData);
			console.log(userBetsData);
		} catch (error) {
			toast("Error!");
		}
	}

	return (
		<BetPageContainer>
			<h1>Bet Page</h1>

			{games.map((game) => (
				<div key={game.id}>
					<CardGame game={game} />
				</div>
			))}

			<div className="buttons">
				<button onClick={() => end()}>End games</button>
				<button onClick={() => getUserBets()}>User Bets</button>
			</div>
		</BetPageContainer>
	)
}