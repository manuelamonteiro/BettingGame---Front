import { FormContainer } from "../assets/FormContainer-style";

export default function AuthForm(props) {
	return (
		<FormContainer>
			{props.children}
		</FormContainer>
	)
}