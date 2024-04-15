import { useState, useEffect } from "react";

export default function CardGame({ game }) {
	const [team1, setTeam1] = useState('');
	const [team2, setTeam2] = useState('');

	useEffect(() => {
		if (game && game.name) {
			const [part1, part2] = game.name.split('x');
			setTeam1(part1);
			setTeam2(part2);
		}
	}, [game]);

	return (
		<div>
			<h2>{game.name}</h2>
			<div className="card">
				<h2>Selecione apenas uma opção:</h2>
				<div className="option">
					<input type="checkbox" id="option1" name="option1" />
					<label htmlFor="option1">{team1}</label>
				</div>
				<div className="option">
					<input type="checkbox" id="option2" name="option2" />
					<label htmlFor="option2">{team2}</label>
				</div>
				<div className="option">
					<input type="checkbox" id="option3" name="option3" />
					<label htmlFor="option3">Draw</label>
				</div>
				<button id="submitButton">Enviar</button>
				<h3>Result: {game.result}</h3>
			</div>
		</div>
	);
}
