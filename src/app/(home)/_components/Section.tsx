type Props = {
	title: string;
	children?: React.ReactNode;
};

const Section = ({ title, children }: Props) => {
	return (
		<div className="max-w-page mx-auto mt-2 w-full">
			<h2 className="mb-10 text-2xl font-semibold">{title}</h2>
			{children}
		</div>
	);
};

export { Section };
