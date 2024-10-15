import { twMerge } from 'tailwind-merge';

type Props = {
	title: string;
	children?: React.ReactNode;
	className?: string;
};

const Section = ({ title, children, className }: Props) => {
	return (
		<div className={twMerge('mx-auto w-full max-w-page py-32', className)}>
			<h2 className="mb-16 text-2xl sm:text-4xl font-semibold">{title}</h2>
			{children}
		</div>
	);
};

export { Section };
