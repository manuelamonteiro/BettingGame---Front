import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthForm from "../components/AuthForm";
import { signUp } from "../services/userApi";
import { SignCointaner } from "../assets/SignPages-style";
import Logo from "../components/Logo";

export default function SignUpPage() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function submit(event) {
		event.preventDefault();

		try {
			await signUp(username, password);
			toast('Cadastro realizado com sucesso!');
			navigate('/login');
		} catch (error) {
			toast("Erro inesperado, tente novamente!");
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

					<button type="submit">Registrar</button>
				</form>

				<h2 onClick={() => navigate("/login")}>Já tem uma conta? Faça login!</h2>
			</AuthForm>
		</SignCointaner >
	)
}
