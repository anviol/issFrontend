import { twMerge } from 'tailwind-merge';

type Props = {
	title: string;
	id?: string;
	children?: React.ReactNode;
	className?: string;
	jumpToClassName?: string;
};

const Section = ({
	title,
	children,
	className,
	jumpToClassName,
	id,
}: Props) => {
	return (
		<div className={twMerge('mx-auto w-full max-w-page py-32', className)}>
			<span id={id} className={jumpToClassName} />
			<h2 id={id} className="mb-16 text-2xl font-semibold sm:text-3xl">
				{title}
			</h2>
			{children}
		</div>
	);
};

export { Section };
