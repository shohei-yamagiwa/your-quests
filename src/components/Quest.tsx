import check from "@/assets/check.svg";
import int from "@/assets/intelligence.svg";
import mon from "@/assets/money.svg";
import str from "@/assets/strength.svg";
import vit from "@/assets/vital.svg";
import { Checkbox } from "@headlessui/react";
import clsx from "clsx";

type Props = {
	title: string;
	type: "strength" | "vitality" | "wealth" | "intelligence";
	isDone: boolean;
	className?: string;
	onClick: () => void;
};

export function Quest({ title, type, isDone, className, onClick }: Props) {
	const icon = (): string => {
		switch (type) {
			case "strength":
				return str;
			case "vitality":
				return vit;
			case "wealth":
				return mon;
			case "intelligence":
				return int;
		}
	};
	return (
		<li className={clsx(className, "p-2 flex flex-row justify-between items-center gap-2")} onClick={onClick} onKeyUp={() => {}}>
			<img className={clsx("flex-none size-6")} src={icon()} alt="" />
			<span className={clsx("grow shrink flex flex-row justify-end items-center gap-2")}>
				<span className={clsx("grow shrink font-roboto font-normal text-white text-end text-nowrap truncate")}>{title}</span>
				<Checkbox className={clsx("size-4 flex-none ring-1 ring-white rounded")} checked={isDone}>
					{isDone && <img className="size-full group-data-[checked]:block" src={check} alt="" />}
				</Checkbox>
			</span>
		</li>
	);
}
