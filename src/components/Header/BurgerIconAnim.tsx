import { twMerge } from 'tailwind-merge';

const BurgerIconAnim = ({ className }: { className?: string }) => {
	return (
		<span>
			<div
				className={twMerge(
					'h-[3px] w-6 rounded-full bg-white transition-transform group-data-[state=open]:translate-y-1/2 group-data-[state=open]:rotate-45',
					className,
				)}
			/>
			<div
				className={twMerge(
					'my-[5px] h-[3px] w-6 rounded-full bg-white transition-all group-data-[state=open]:my-0 group-data-[state=open]:h-0 group-data-[state=open]:opacity-0',
					className,
				)}
			/>
			<div
				className={twMerge(
					'h-[3px] w-6 rounded-full bg-white transition-transform group-data-[state=open]:-translate-y-1/2 group-data-[state=open]:-rotate-45',
					className,
				)}
			/>
		</span>
	);
};

export { BurgerIconAnim };
