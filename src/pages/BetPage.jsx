import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContext";
import { getGames, endGames } from "../services/gameApi";
import { getBetsByUser } from "../services/betApi";
import CardGame from "../components/CardGame";
import { BetPageContainer } from "../assets/BetPage-style";
import AuthForm from "../components/AuthForm";

export default function BetPage() {
	const { config: userId } = useContext(AuthContext);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [games, setGames] = useState([]);
	const [userBets, setUserBets] = useState(null);
	const [showUserBets, setShowUserBets] = useState(false);
	const [showGames, setShowGames] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const gamesData = await getGames();
				gamesData.sort((a, b) => a.id - b.id);
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
			updatedGames.sort((a, b) => a.id - b.id);
			setGames(updatedGames);
			setShowGames(!showGames);
		} catch (error) {
			toast("Error!");
		}
	}

	async function getUserBets(event) {
		event.preventDefault();

		try {
			const userBetsData = await getBetsByUser(username, password, userId);
			setUserBets(userBetsData);
			setShowUserBets(!showUserBets);

			if (showUserBets) {
				setUsername('');
				setPassword('');
			}
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
				<button onClick={() => end()}>
					End Games
				</button>

				<div>
					<AuthForm>
						<form onSubmit={getUserBets}>
							<input
								name="username"
								value={username}
								onChange={e => setUsername(e.target.value)}
								type="text"
								required
								placeholder="username"
							/>

							<input
								name="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								type="password"
								required
								placeholder="password"
							/>

							<button type="submit">
								{showUserBets ? "Hide User Bets" : "Show User Bets"}
							</button>
						</form>
					</AuthForm>
				</div>
			</div>

			{showUserBets && userBets && (
				<div>
					<h2>User Bets:</h2>
					<pre>{JSON.stringify(userBets, null, 2)}</pre>
				</div>
			)}

			{showGames && games && (
				<div>
					<h2>Results:</h2>
					<pre>{JSON.stringify(games, null, 2)}</pre>
				</div>
			)}
		</BetPageContainer>
	);
}
