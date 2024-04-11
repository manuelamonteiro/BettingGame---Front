import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthForm from "../components/AuthForm";
import { signIn } from "../services/userApi";
import { ScreenCointanerSign } from "../assets/ScreenContainers-style";

export default function SignInPage() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function submit(event) {
		event.preventDefault();

		try {
			await signIn(username, password);
			toast('Login successfully!');
			navigate('/bet');
		} catch (error) {
			toast("Unable to login!");
			setUsername('');
			setPassword('');
		}
	}

	return (
		<ScreenCointanerSign>
			<AuthForm>
				<form onSubmit={submit}>
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

					<button type="submit">Entrar</button>
				</form>

				<h2 onClick={() => navigate("/register")}>Primeira vez? Cadastre-se!</h2>
			</AuthForm>
		</ScreenCointanerSign >
	)
}
