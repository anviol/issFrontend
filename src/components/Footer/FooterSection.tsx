import Link from 'next/link';
import { NavLinks } from '../Header/menu-links';

type Props = {
	title: string;
	data: (NavLinks & {
		icon?: React.ReactElement;
	})[];
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
							target={item.external ? '_blank' : undefined}
						>
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
