import { TProductSupply } from '@/@types/products';

type Props = {
	data: TProductSupply[] | null;
};

export const Supplies = ({ data }: Props) => {
	return (
		<div className="py-2">
			<ul className="list-inside list-disc">
				{data &&
					data.map((item, id) => {
						return (
							<li key={String(id)}>
								{item.children.map((itemb, idb) => {
									return <span key={String(idb)}>{itemb.text}</span>;
								})}
							</li>
						);
					})}
			</ul>
		</div>
	);
};
