import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthForm from "../components/AuthForm";
import { signUp } from "../services/userApi";
import { ScreenCointanerSign } from "../assets/ScreenContainers-style";
import Logo from "../components/Logo";

export default function SignUpPage() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function submit(event) {
		event.preventDefault();

		try {
			await signUp(username, password);
			toast('Registration completed successfully!');
			navigate('/login');
		} catch (error) {
			toast("Unable to register!");
			setUsername('');
			setPassword('');
		}
	}

	return (
		<ScreenCointanerSign>
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

					<button type="submit">Register</button>
				</form>

				<h2 onClick={() => navigate("/login")}>Already have an account? Log in!</h2>
			</AuthForm>
		</ScreenCointanerSign >
	)
}
