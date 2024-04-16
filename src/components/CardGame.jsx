import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContext";
import { CardContainer } from "../assets/BetPage-style";
import AuthForm from "./AuthForm";
import { postBet } from "../services/betApi";

export default function CardGame({ game }) {
	const { config: userId } = useContext(AuthContext);

	const [state, setState] = useState({
		team1: '',
		team2: '',
		username: '',
		password: '',
		selectedTeam: '',
		betAmount: ''
	});


	useEffect(() => {
		if (game && game.name) {
			const [part1, part2] = game.name.split('x');
			setState(prevState => ({ ...prevState, team1: part1, team2: part2 }));
		}
	}, [game]);

	function handleChange(e) {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	}

	async function postUserBet(event) {
		event.preventDefault();

		const { username, password, betAmount, selectedTeam } = state;
		const gameId = game.id;

		if (!username || !password || !betAmount || !selectedTeam || !userId || !gameId) {
			toast('Preencha todos os campos, por favor!');
			return;
		}

		try {
			await postBet(username, password, betAmount, selectedTeam, userId, gameId);
			toast("Aposta realizada com sucesso!");
		} catch (error) {
			toast("Erro inesperado, tente novamente!");
		}
	}

	return (
		<CardContainer>
			<div className="card">
				<h2>{game.name}</h2>

				<p>Selecione uma opção:</p>

				<div className="option">
					<input type="radio" id={state.team1} name="selectedTeam" value={state.team1} onChange={handleChange} />
					<label htmlFor={state.team1}>{state.team1}</label>
				</div>

				<div className="option">
					<input type="radio" id={state.team2} name="selectedTeam" value={state.team2} onChange={handleChange} />
					<label htmlFor={state.team2}>{state.team2}</label>
				</div>

				<div className="option">
					<input type="radio" id="draw" name="selectedTeam" value="draw" onChange={handleChange} />
					<label htmlFor="draw">Empate</label>
				</div>

				<input
					className="input-betAmount"
					name="betAmount"
					value={state.betAmount}
					onChange={handleChange}
					type="text"
					required
					placeholder="valor da aposta"
				/>
			</div>

			<AuthForm>
				<form onSubmit={postUserBet}>
					<input
						name="username"
						value={state.username}
						onChange={handleChange}
						type="text"
						required
						placeholder="username"
					/>

					<input
						name="password"
						value={state.password}
						onChange={handleChange}
						type="password"
						required
						placeholder="password"
					/>

					<button type="submit">Enviar</button>
				</form>
			</AuthForm>
		</CardContainer>
	);
}
