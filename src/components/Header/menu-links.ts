type NavLinks =
	| {
			id: string;
			title: string;
			href: string;
			isProductsLink: true;
			brands: { id: string; title: string; href: string }[];
	  }
	| {
			id: string;
			title: string;
			href: string;
			isProductsLink?: false;
			brands?: never;
	  };

export const extraLinks: NavLinks[] = [
	{
		title: 'Sobre nós',
		href: '/sobre',
		id: '1',
	},
	{
		id: '5',
		title: 'Produtos',
		href: '',
		isProductsLink: true,
		brands: [
			{ id: '1', title: 'Mimaki', href: '/produtos/Mimaki' },
			{ id: '2', title: '4P', href: '/produtos/4P' },
		],
	},
	{
		title: 'Eventos e Mídias',
		href: '/eventos',
		id: '2',
	},
	{
		title: 'Boletos',
		href: '/',
		id: '3',
	},
	{
		title: 'Contato',
		href: '/contato',
		id: '4',
	},
];
