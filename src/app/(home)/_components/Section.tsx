import { twMerge } from 'tailwind-merge';

type Props = {
	title: string;
	children?: React.ReactNode;
	className?: string;
};

const Section = ({ title, children, className }: Props) => {
	return (
		<div className={twMerge('max-w-page mx-auto w-full py-28', className)}>
			<h2 className="mb-10 text-2xl font-semibold">{title}</h2>
			{children}
		</div>
	);
};

export { Section };
