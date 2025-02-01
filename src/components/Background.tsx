import clsx from "clsx";

type Props = {
	children: Readonly<React.ReactNode>;
	className?: string;
};

export function Background({ children, className }: Props) {
	return (
		<div className={clsx(className, "relative z-0 overflow-hidden")}>
			<div className={clsx("absolute z-10 top-0 left-0 size-[2000px] bg-radial blur-2xl from-emerald-400 via-emerald-600 to-transparent")} />
			<div className={clsx("absolute z-10 bottom-0 right-0 size-[4000px] bg-radial blur-2xl from-cyan-600 via-cyan-400 to-transparent")} />
			<div className={clsx("absolute z-20 size-full bg-[#f1f1f160] backdrop-blur-lg")}>{children}</div>
		</div>
	);
}
