import { Background } from "@/components/Background";
import { AuthContext } from "@/contexts/auth.context";
import { useRegister } from "@/hooks/register.hook";
import clsx from "clsx";
import { use } from "react";
import { Navigate } from "react-router";

export function Register() {
	const { userLoggedIn } = use(AuthContext);
	const { pending, error, updateEmail, updatePassword, action } = useRegister();
	if (userLoggedIn) {
		return <Navigate to="/" />;
	}
	return (
		<Background className={clsx("w-full h-screen")}>
			<form className={clsx("w-full p-8 flex flex-col items-center gap-8")} action={action}>
				<h1 className="font-roboto font-light text-white text-3xl">Register</h1>
				<div className="w-full flex flex-col items-center gap-4">
					<input
						className="w-full px-4 py-2 font-roboto font-normal text-white placeholder:text-white/90 focus:outline-0 border border-white bg-white/10"
						type="email"
						placeholder="Email"
						onChange={updateEmail}
					/>
					<input
						className="w-full px-4 py-2 font-roboto font-normal text-white placeholder:text-white/90 focus:outline-0 border border-white bg-white/10"
						type="password"
						placeholder="Password"
						onChange={updatePassword}
					/>
				</div>

				{pending && <span>Logging in...</span>}
				{error && <span>{error.message}</span>}
				<button
					className="w-full px-4 py-2 font-roboto font-normal text-white placeholder:text-white/90 focus:outline-0 border border-white bg-white/10"
					type="submit"
				>
					Register
				</button>
			</form>
		</Background>
	);
}
