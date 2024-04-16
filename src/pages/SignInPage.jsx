import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthForm from "../components/AuthForm";
import { signIn } from "../services/userApi";
import { SignCointaner } from "../assets/SignPages-style";
import { AuthContext } from "../contexts/AuthContext";
import Logo from "../components/Logo";

export default function SignInPage() {
	const navigate = useNavigate();
	const { setConfig } = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function submit(event) {
		event.preventDefault();

		try {
			const userData = await signIn(username, password);
			setConfig(userData.id);
			localStorage.setItem("userId", userData.id);
			toast('Login successfully!');
			navigate('/bets');
		} catch (error) {
			toast("Unable to login!");
			setUsername('');
			setPassword('');
		}
	}

	return (
		<SignCointaner>
			<Logo />
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
		</SignCointaner >
	)
}
