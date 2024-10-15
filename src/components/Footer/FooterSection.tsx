import Link from 'next/link';

type Props = {
	title: string;
	data: {
		id: string;
		href: string;
		title: string;
		icon?: React.ReactElement;
		targetBlank?: boolean;
	}[];
};

export function FooterSections({ title, data }: Props) {
	return (
		<div>
			<h4 className="w-full font-semibold">{title}</h4>
			<ul className="mt-6 space-y-3">
				{data.map((item) => (
					<li
						key={item.id}
						className="flex gap-1 font-light opacity-70 hover:opacity-100"
					>
						{item?.icon}
						<Link
							href={item.href}
							target={item.targetBlank ? '_blank' : undefined}
						>
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
