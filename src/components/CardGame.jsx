import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../contexts/AuthContext";
import { CardContainer } from "../assets/BetPage-style";
import AuthForm from "./AuthForm";
import { postBet } from "../services/betApi";

export default function CardGame({ game }) {
	const { config: userId } = useContext(AuthContext);

	const [team1, setTeam1] = useState('');
	const [team2, setTeam2] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [selectedTeam, setSelectedTeam] = useState('');
	const [betAmount, setBetAmount] = useState('');

	useEffect(() => {
		if (game && game.name) {
			const [part1, part2] = game.name.split('x');
			setTeam1(part1);
			setTeam2(part2);
		}
	}, [game]);

	async function postUserBet(event) {
		event.preventDefault();

		const gameId = game.id;
		if (!username || !password || !betAmount || !selectedTeam || !userId || !gameId) {
			toast('Preencha todos os campos, por favor!');
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
					<input type="radio" id={team1} name="selectedTeam" value={team1} onChange={e => setSelectedTeam(e.target.value)} />
					<label htmlFor={team1}>{team1}</label>
				</div>

				<div className="option">
					<input type="radio" id={team2} name="selectedTeam" value={team2} onChange={e => setSelectedTeam(e.target.value)} />
					<label htmlFor={team2}>{team2}</label>
				</div>

				<div className="option">
					<input type="radio" id="draw" name="selectedTeam" value="draw" onChange={e => setSelectedTeam(e.target.value)} />
					<label htmlFor="draw">Empate</label>
				</div>

				<input
					className="input-betAmount"
					name="betAmount"
					value={betAmount}
					onChange={e => setBetAmount(e.target.value)}
					type="text"
					required
					placeholder="valor da aposta"
				/>
			</div>

			<AuthForm>
				<form onSubmit={postUserBet}>
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

					<button type="submit">Enviar</button>
				</form>
			</AuthForm>
		</CardContainer>
	);
}
