import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthForm from "../components/AuthForm";
import { signUp } from "../services/userApi";
import { SignContainer } from "../assets/SignPages-style";
import Logo from "../components/Logo";

export default function SignUpPage() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	async function handleSubmit(event) {
		event.preventDefault();

		const { username, password } = formData;

		try {
			await signUp(username, password);
			toast('Cadastro realizado com sucesso!');
			navigate('/login');
		} catch (error) {
			toast("Erro inesperado, tente novamente!");
			setFormData({
				username: '',
				password: ''
			});
		}
	}

	return (
		<SignContainer >
			<Logo />
			<AuthForm>
				<form onSubmit={handleSubmit}>
					<input
						name="username"
						value={formData.username}
						onChange={handleChange}
						type="text"
						required
						placeholder="username"
					/>

					<input
						name="password"
						value={formData.password}
						onChange={handleChange}
						type="password"
						required
						placeholder="password"
					/>

					<button type="submit">Registrar</button>
				</form>

				<h2 onClick={() => navigate("/login")}>Já tem uma conta? Faça login!</h2>
			</AuthForm>
		</SignContainer  >
	)
}
