import { invoke } from "@/usecases/register.usecase";
import { useState } from "react";
import { resolvePath, useNavigate } from "react-router";

export function useRegister() {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [pending, setPending] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	function updateEmail(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		setEmail(event.target.value);
	}
	function updatePassword(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		setPassword(event.target.value);
	}

	async function action() {
		setPending(true);

		await invoke(email, password)
			.catch((error: Error) => setError(error))
			.finally(() => {
				setPending(false);
				navigate(resolvePath("/"));
			});
	}

	return {
		updateEmail,
		updatePassword,
		action,
		pending,
		error,
	};
}
