import { twMerge } from 'tailwind-merge';

type Props = {
	title: string;
	children?: React.ReactNode;
	className?: string;
};

const Section = ({ title, children, className }: Props) => {
	return (
		<div className={twMerge('mx-auto w-full max-w-page py-32', className)}>
			<h2 className="mb-16 text-2xl font-semibold sm:text-3xl">{title}</h2>
			{children}
		</div>
	);
};

export { Section };
