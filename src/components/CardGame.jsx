import { useState, useEffect } from "react";

import { CardContainer } from "../assets/BetPage-style";
import AuthForm from "./AuthForm";

export default function CardGame({ game }) {
	const [team1, setTeam1] = useState('');
	const [team2, setTeam2] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (game && game.name) {
			const [part1, part2] = game.name.split('x');
			setTeam1(part1);
			setTeam2(part2);
		}
	}, [game]);

	return (
		<CardContainer>
			<div className="card">
				<h2>{game.name}</h2>

				<p>Selecione apenas uma opção:</p>

				<div className="option">
					<input type="checkbox" id={team1} name={team1} />
					<label htmlFor="option1">{team1}</label>
				</div>

				<div className="option">
					<input type="checkbox" id={team2} name={team2} />
					<label htmlFor="option2">{team2}</label>
				</div>

				<div className="option">
					<input type="checkbox" id="draw" name="draw" />
					<label htmlFor="option3">Empate</label>
				</div>
			</div>

			<AuthForm>
				<form onSubmit={() => { }}>
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
