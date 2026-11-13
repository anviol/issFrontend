import Link from 'next/link';
import Image from 'next/image';
import { NavigationMenu } from './NavMenu';
import { NavigationMenuMobile } from './NavMenuMobile';
import { api } from '@/company-api/api';
import { WithPagination } from '@/@types/api';
import { NavLinks } from './menu-links';
import { DescricoesDasMarcas } from './MenuProductArea';
import { WarningMessage } from '../WarningMessage';

type ThirdPartyLink = {
	data: {
		id: number;
		attributes: {
			link: string;
		};
	};
};

type Fornecedor = {
	id: number;
	attributes: {
		nome: string;
		descricao: string | null;
	};
};

const Header = async () => {
	const [{ boletosNavData, chamadosNavData }, descricoesDasMarcas] =
		await Promise.all([getData(), getDescricoesDasMarcas()]);

	return (
		<header className="sticky left-0 right-0 top-0 z-20">
			<div className="flex items-center justify-center bg-black/90">
				<NavigationMenuMobile
					boletosNavData={boletosNavData}
					chamadosNavData={chamadosNavData}
					descricoesDasMarcas={descricoesDasMarcas}
				/>

				<div className="flex flex-1 justify-center p-4">
					<Link href={'/'}>
						<Image
							width={512}
							height={512}
							src="/assets/ISS (Branca).svg"
							alt="Lôgo ISS"
							priority
							className="aspect-auto w-16 md:w-28 md:min-w-16"
						/>
					</Link>
				</div>

				<NavigationMenu
					boletosNavData={boletosNavData}
					chamadosNavData={chamadosNavData}
					descricoesDasMarcas={descricoesDasMarcas}
				/>

				<div className="flex justify-center p-6 md:flex-1"></div>
			</div>
			<WarningMessage />
		</header>
	);
};

async function getData() {
	const { data: boletosLink } = await api<ThirdPartyLink>({
		url: '/segunda-via-boleto',
		fetchOptions: {
			next: {
				revalidate: 3600,
			},
		},
	});

	const { data: chamadosLink } = await api<ThirdPartyLink>({
		url: '/chamado',
		fetchOptions: {
			next: {
				revalidate: 3600,
			},
		},
	});

	// O id vira a key da lista do menu. Os dois links são tipos únicos no CMS, e os dois têm
	// id 1, então a key não pode vir dele.
	const chamadosNavData: NavLinks = {
		id: 'chamados',
		href: chamadosLink.attributes.link,
		title: 'Chamados',
		external: true,
	};

	const boletosNavData: NavLinks = {
		id: 'boletos',
		href: boletosLink.attributes.link,
		title: 'Boletos',
		external: true,
	};

	return { chamadosNavData, boletosNavData };
}

async function getDescricoesDasMarcas(): Promise<DescricoesDasMarcas> {
	const { data, error } = await api<WithPagination<Fornecedor>>({
		url: '/fornecedors',
		strapiQueryParams: ['fields[0]=nome', 'fields[1]=descricao'],
		fetchOptions: {
			cache: 'no-store',
		},
	});

	// A descrição só complementa o menu. Sem ela, as marcas aparecem só com o nome, e o
	// site continua no ar.
	if (error) {
		console.warn(`Descrições das marcas indisponíveis: ${error.status} ${error.message}`);
		return {};
	}

	return Object.fromEntries(
		data.map(({ attributes }) => [attributes.nome, attributes.descricao ?? undefined]),
	);
}

export { Header };
