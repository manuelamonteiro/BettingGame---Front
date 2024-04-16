import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthForm from "../components/AuthForm";
import { signIn } from "../services/userApi";
import { SignContainer } from "../assets/SignPages-style";
import { AuthContext } from "../contexts/AuthContext";
import Logo from "../components/Logo";

export default function SignInPage() {
	const navigate = useNavigate();
	const { setConfig } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		username: "",
		password: ""
	});

	useEffect(() => {
		localStorage.setItem("userId", "");
	}, []);

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
			const userData = await signIn(username, password);
			setConfig(userData.id);
			localStorage.setItem("userId", userData.id);
			toast("Login realizado com sucesso!");
			navigate("/bets");
		} catch (error) {
			toast("Erro inesperado, tente novamente!");
			setFormData({
				username: "",
				password: ""
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

					<button type="submit">Entrar</button>
				</form>

				<h2 onClick={() => navigate("/register")}>Primeira vez? Cadastre-se!</h2>
			</AuthForm>
		</SignContainer  >
	)
}
