import { TFormOptions } from '@/@types/form';
import { api } from '@/company-api/api';
import { notFound } from 'next/navigation';
import { ClientForm } from './Form';
import { Footer } from '@/components/Footer';
import './shape-divider.css';

export default async function LandingPage() {
	const data = await getDate();

	return (
		<div className="flex min-h-screen flex-col items-center bg-slate-50">
			<div className="flex w-full items-center justify-center bg-issYellow py-4">
				<img src={'/assets/ISS (Preto).svg'} alt="" className="h-32 w-32" />
			</div>
			<div id="shapedivider" />

			<div className="mb-32 mt-8 flex h-min max-w-page flex-col gap-4 gap-y-16 md:flex-row">
				<div className="flex-1 p-2 leading-8 md:max-w-[50%] md:p-8">
					<h2 className="mb-8 text-justify text-2xl font-semibold">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</h2>

					<p className="text-justify">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
						ipsa dolor quisquam! Aspernatur temporibus aut voluptas non minima
						ut, culpa molestias odit consequatur adipisci, iste illum, eum
						maiores dolorum veritatis.
					</p>

					<ul className="mt-12 flex flex-col justify-between gap-8">
						<li className="flex items-center gap-2">
							<img
								src={'/assets/drawings/savings.svg'}
								alt="Preços diferenciado"
								className="aspect-square w-[20%] rounded-full shadow-[-5px_2px_0px_#fbba16]"
							/>
							<span className="flex-1">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</span>
						</li>
						<li className="flex items-center gap-2">
							<img
								src={'/assets/drawings/connecting_teams.svg'}
								alt="Preços diferenciado"
								className="aspect-square w-[20%] rounded-full shadow-[-5px_2px_0px_#fbba16]"
							/>
							<span className="flex-1">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</span>
						</li>
						<li className="flex items-center gap-2">
							<img
								src={'/assets/drawings/printing.svg'}
								alt="Preços diferenciado"
								className="aspect-square w-[20%] rounded-full shadow-[-5px_2px_0px_#fbba16]"
							/>
							<span className="flex-1">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</span>
						</li>
						<li className="flex items-center gap-2">
							<img
								src={'/assets/drawings/printing.svg'}
								alt="Preços diferenciado"
								className="aspect-square w-[20%] rounded-full shadow-[-5px_2px_0px_#fbba16]"
							/>
							<span className="flex-1">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</span>
						</li>
					</ul>
				</div>

				<div className="mb-auto flex-1 space-y-8 rounded-lg bg-white p-2 shadow-sm md:max-w-[50%] md:p-8">
					<span className="text-justify text-lg font-medium text-muted-foreground">
						Envie uma mensagem e tenha acesso a uma consultoria exclusiva para
						atender sua necessidade
					</span>

					<ClientForm fields={data} />
				</div>
			</div>

			<div className="w-full">
				<Footer />
			</div>
		</div>
	);
}

const getDate = async () => {
	const { error, data } = await api<TFormOptions>({
		url: '/formularios',
		strapiQueryParams: ['populate=*', 'pagination[limit]=1000'],
		fetchOptions: {
			cache: 'no-store',
		},
	});

	if (error) {
		if (error.status === 404) return notFound();
		throw new Error(error.message);
	}

	return data;
};
