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

	const [state, setState] = useState({
		formData: {
			username: "",
			password: ""
		},
		games: [],
		userBets: null,
		showUserBets: false,
		showGames: false
	});

	useEffect(() => {
		async function fetchData() {
			try {
				const gamesData = await getGames();
				gamesData.sort((a, b) => a.id - b.id);
				setState(prevState => ({ ...prevState, games: gamesData }));
			} catch (error) {
				toast("Erro inesperado ao carregar os jogos, tente novamente!");
			}
		};

		fetchData();
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		setState(prevState => ({
			...prevState,
			formData: {
				...prevState.formData,
				[name]: value
			}
		}));
	};

	async function handleEndGames() {
		try {
			const { showGames } = state;
			if (!showGames) {
				await endGames();
				const updatedGames = await getGames();
				updatedGames.sort((a, b) => a.id - b.id);
				setState(prevState => ({ ...prevState, games: updatedGames }));
			}

			setState(prevState => ({ ...prevState, showGames: !prevState.showGames }));
		} catch (error) {
			toast("Erro inesperado, tente novamente!");
		}
	}

	async function handleGetUserBets(event) {
		event.preventDefault();

		try {
			const { username, password } = state.formData;
			const userBetsData = await getBetsByUser(username, password, userId);
			setState(prevState => ({ ...prevState, userBets: userBetsData }));
			setState(prevState => ({ ...prevState, showUserBets: !prevState.showUserBets }));

			if (state.showUserBets) {
				setState(prevState => ({
					...prevState,
					formData: {
						username: "",
						password: ""
					}
				}));
			}
		} catch (error) {
			toast("Erro inesperado, tente novamente!");
		}
	}

	return (
		<BetPageContainer>
			<h1>Página de aposta</h1>

			{
				state.games.length > 0 ? (
					state.games.map((game) => (
						<div key={game.id}>
							<CardGame game={game} />
						</div>
					))
				) : "Carregando..."
			}

			<div className="buttons">
				<button onClick={handleEndGames}>
					{state.showGames ? "Esconder resultados" : "Fechar as apostas"}
				</button>

				<div>
					<AuthForm>
						<form onSubmit={handleGetUserBets}>
							<input
								name="username"
								value={state.formData.username}
								onChange={handleChange}
								type="text"
								required
								placeholder="username"
							/>

							<input
								name="password"
								value={state.formData.password}
								onChange={handleChange}
								type="password"
								required
								placeholder="password"
							/>

							<button type="submit">
								{state.showUserBets ? "Esconder as apostas" : "Mostrar as apostas"}
							</button>
						</form>
					</AuthForm>
				</div>
			</div>

			{state.showUserBets && state.userBets && (
				<div>
					<h2>Apostas do usuário:</h2>
					<pre>{JSON.stringify(state.userBets, null, 2)}</pre>
				</div>
			)}

			{state.showGames && state.games && (
				<div>
					<h2>Resultados:</h2>
					<pre>{JSON.stringify(state.games, null, 2)}</pre>
				</div>
			)}
		</BetPageContainer>
	);
}
