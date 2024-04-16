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
				toast("Erro inesperado ao carregar os jogos, tente novamente!");
			}
		};

		fetchData();
	}, []);

	async function end() {
		try {
			if (!showGames) {
				await endGames();
				const updatedGames = await getGames();
				updatedGames.sort((a, b) => a.id - b.id);
				setGames(updatedGames);
			}

			setShowGames(!showGames);
		} catch (error) {
			toast("Erro inesperado, tente novamente!");
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
			toast("Erro inesperado, tente novamente!");
		}
	}

	return (
		<BetPageContainer>
			<h1>Página de aposta</h1>

			{
				games.length > 0 ? (
					games.map((game) => (
						<div key={game.id}>
							<CardGame game={game} />
						</div>
					))
				) : "Carregando..."
			}

			<div className="buttons">
				<button onClick={() => end()}>
					Feche as apostas
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
								{showUserBets ? "Esconda as apostas" : "Mostre as apostas"}
							</button>
						</form>
					</AuthForm>
				</div>
			</div>

			{showUserBets && userBets && (
				<div>
					<h2>Apostas do usuário:</h2>
					<pre>{JSON.stringify(userBets, null, 2)}</pre>
				</div>
			)}

			{showGames && games && (
				<div>
					<h2>Resultados:</h2>
					<pre>{JSON.stringify(games, null, 2)}</pre>
				</div>
			)}
		</BetPageContainer>
	);
}
