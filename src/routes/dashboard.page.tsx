import intelligenceIcon from "@/assets/intelligence.svg";
import moneyIcon from "@/assets/money.svg";
import strengthIcon from "@/assets/strength.svg";
import vitalIcon from "@/assets/vital.svg";
import { Background } from "@/components/Background";
import { ProgressBar } from "@/components/ProgressBar";
import { AuthContext } from "@/contexts/auth.context";
import clsx from "clsx";
import { use } from "react";
import { Link, Navigate } from "react-router";

export function Dashboard() {
	const { userLoggedIn, currentUser } = use(AuthContext);
	const userIcon = currentUser?.photoURL;
	const username = currentUser?.displayName || currentUser?.email;
	if (!userLoggedIn) {
		return <Navigate replace={true} to="/register" />;
	}
	return (
		<Background className={clsx("w-full h-screen")}>
			<main className={clsx("size-full flex flex-col items-center")}>
				<div className={clsx("w-full max-w-lg h-full p-8 flex flex-col justify-center items-center gap-8")}>
					{/* Heading */}
					<h1 className={clsx("font-roboto font-light text-3xl tracking-wider text-white")}>STATUS</h1>

					{/* Profile */}
					<div className={clsx("w-full flex flex-col items-center gap-4")}>
						<img className={clsx("size-20 rounded-full border border-white object-cover object-center")} src={userIcon || undefined} alt="" />
						<div className={clsx("font-roboto font-normal text-xl text-white")}>{username}</div>
					</div>

					{/* Level */}
					<div className={clsx("w-full p-8 flex flex-col justify-center items-center gap-3 border border-white")}>
						{/* Number */}
						<div className={clsx("flex flex-col items-center")}>
							<div className={clsx("font-roboto font-bold text-4xl text-white")}>21</div>
							<div className={clsx("font-roboto font-light text-lg text-white")}>LEVEL</div>
						</div>

						{/* Progress */}
						<div className={clsx("w-full flex flex-col items-end gap-1")}>
							<ProgressBar className="w-full" value={0.75} />
							<div className={clsx("w-full p-1 flex flex-row justify-between items-center")}>
								<div className={clsx("font-roboto font-medium text-xs text-white")}>Current: 375 / 500</div>
								<div className={clsx("font-roboto font-medium text-xs text-white")}>To next level: 125</div>
							</div>
						</div>
					</div>

					{/* Details */}
					<ul className={clsx("w-full p-8 grid grid-cols-2 gap-2 border border-white")}>
						<li className={clsx("flex flex-row justify-start items-center gap-2")}>
							<img className={clsx("h-6")} src={strengthIcon} alt="" />
							<span className={clsx("font-roboto font-normal text-white")}>STR: </span>
							<span className={clsx("font-roboto font-semibold text-xl text-white")}>20</span>
						</li>
						<li className={clsx("flex flex-row justify-end items-center gap-2")}>
							<img className={clsx("h-6")} src={vitalIcon} alt="" />
							<span className={clsx("font-roboto font-normal text-white")}>VIT: </span>
							<span className={clsx("font-roboto font-semibold text-xl text-white")}>20</span>
						</li>
						<li className={clsx("flex flex-row justify-start items-center gap-2")}>
							<img className={clsx("h-6")} src={intelligenceIcon} alt="" />
							<span className={clsx("font-roboto font-normal text-white")}>INT: </span>
							<span className={clsx("font-roboto font-semibold text-xl text-white")}>20</span>
						</li>
						<li className={clsx("flex flex-row justify-end items-center gap-2")}>
							<img className={clsx("h-6")} src={moneyIcon} alt="" />
							<span className={clsx("font-roboto font-normal text-white")}>MON: </span>
							<span className={clsx("font-roboto font-semibold text-xl text-white")}>20</span>
						</li>
					</ul>

					<div className={clsx("w-full h-0.5 bg-white opacity-75 rounded")} />

					{/* Navigations */}
					<Link to={"/quests"} className={clsx("w-full px-4 py-2 font-roboto text-lg text-white text-center border border-white")}>
						Quests
					</Link>
				</div>
			</main>
		</Background>
	);
}
