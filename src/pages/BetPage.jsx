import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function BetPage() {
	const { config: userId } = useContext(AuthContext);

	return (
		<>
			Página de Apostas!
			{userId}
		</>
	)
}