import { between } from "@/lib/math";
import clsx from "clsx";

type Props = {
	value: number;
	className?: string;
};

export function ProgressBar({ value, className }: Props) {
	const barRatio: number = between(0.0, value, 1.0);
	const barWidth: string = `${barRatio * 100.0}%`;
	return (
		<div className={clsx(className, "h-3 rounded-xl border border-white bg-transparent")}>
			<div className={clsx("border-4 border-transparent border-solid rounded bg-white bg-clip-padding")} style={{ width: barWidth, height: "100%" }} />
		</div>
	);
}
