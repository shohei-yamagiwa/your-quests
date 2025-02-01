import intelligence from "@/assets/intelligence.svg";
import wealth from "@/assets/money.svg";
import strength from "@/assets/strength.svg";
import vitality from "@/assets/vital.svg";
import { Background } from "@/components/Background";
import { Quest } from "@/components/Quest";
import { AuthContext } from "@/contexts/auth.context";
import { invoke } from "@/usecases/add-quest.usecase";
import { doneQuest } from "@/usecases/done-quest.usecase";
import { getAllQuests } from "@/usecases/get-all-quests.usecase";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import clsx from "clsx";
import type { DocumentData } from "firebase/firestore";
import { type ChangeEvent, use, useEffect, useState } from "react";

export function Quests() {
	const { currentUser, userLoggedIn } = use(AuthContext);
	const [quests, setQuests] = useState<DocumentData[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
	}

	// States for new quest
	const [type, setType] = useState<"strength" | "vitality" | "intelligence" | "wealth">("strength");
	const [title, setTitle] = useState<string>("");
	function updateType(value: "strength" | "vitality" | "intelligence" | "wealth") {
		setType(value);
	}
	function updateTitle(event: ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		setTitle(event.target.value);
	}
	async function addQuest() {
		if (!userLoggedIn) {
			return;
		}
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		await invoke(currentUser!, type, title);
		closeModal();
	}

	async function onClick(id: string) {
		await doneQuest(id);
	}

	useEffect(() => {
		if (!currentUser) {
			return;
		}
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		getAllQuests(currentUser!).then((arr) => {
			setQuests(arr);
		});
	});
	return (
		<Background className={clsx("w-full h-screen")}>
			<main className={clsx("size-full flex flex-col items-center")}>
				<div className={clsx("w-full max-w-lg h-full p-8 flex flex-col justify-center items-center gap-8")}>
					{/* Heading */}
					<h1 className={clsx("font-roboto font-light text-3xl tracking-wider text-white")}>Quests</h1>

					<div className={clsx("w-full h-1/2 p-8 border border-white flex flex-col items-center gap-8")}>
						{/* Subheading */}
						<h2 className={clsx("font-roboto font-light text-2xl text-white underline underline-offset-6")}>Goal</h2>

						{/* Quest List */}
						<ul className={clsx("w-full overflow-y-auto")}>
							{quests?.map((doc) => (
								<Quest
									className="w-full"
									key={doc.data().title}
									title={doc.data().title}
									type={doc.data().type}
									isDone={doc.data().isDone}
									onClick={() => onClick(doc.id)}
								/>
							))}
						</ul>
					</div>

					<Button
						className={clsx("w-full px-4 py-2 font-roboto text-lg text-white text-center border border-white bg-white/10 focus:outline-0")}
						onClick={openModal}
					>
						New quest
					</Button>

					{/* Add Quest */}
					<Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={closeModal}>
						<div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-2xl">
							<div className="min-h-full p-8 flex flex-col items-center justify-center">
								<DialogPanel
									transition
									className="w-full max-w-md p-6 border border-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 flex flex-col items-center gap-8"
								>
									<DialogTitle as="h3" className="text-xl font-medium text-white">
										New quest
									</DialogTitle>
									<form className={clsx("w-full flex flex-col items-center gap-4")}>
										<div className={clsx("w-full flex flex-row justify-center items-center gap-2")}>
											<Button
												className={clsx("size-12 p-2 border border-white", type !== "strength" && "brightness-90")}
												onClick={() => updateType("strength")}
											>
												<img className={clsx("size-full")} src={strength} alt="" />
											</Button>
											<Button
												className={clsx("size-12 p-2 border border-white", type !== "vitality" && "brightness-90")}
												onClick={() => updateType("vitality")}
											>
												<img className={clsx("size-full")} src={vitality} alt="" />
											</Button>
											<Button
												className={clsx("size-12 p-2 border border-white", type !== "intelligence" && "brightness-90")}
												onClick={() => updateType("intelligence")}
											>
												<img className={clsx("size-full")} src={intelligence} alt="" />
											</Button>
											<Button className={clsx("size-12 p-2 border border-white", type !== "wealth" && "brightness-90")} onClick={() => updateType("wealth")}>
												<img className={clsx("size-full")} src={wealth} alt="" />
											</Button>
										</div>
										<input
											className={clsx("w-full px-2 py-1 border border-white text-lg text-white placeholder:text-white/80 bg-white/10 focus:outline-0")}
											type="text"
											placeholder="Title"
											onChange={updateTitle}
										/>
									</form>
									<Button className="px-6 py-2 border border-white font-semibold text-white bg-white/10 focus:outline-0" onClick={addQuest}>
										Add
									</Button>
								</DialogPanel>
							</div>
						</div>
					</Dialog>
				</div>
			</main>
		</Background>
	);
}
