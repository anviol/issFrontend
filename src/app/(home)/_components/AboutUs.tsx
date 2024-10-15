import Image from 'next/image';
import { MoreButton } from '@/components/MoreButton';

const AboutUs = () => {
	return (
		<div className="flex">
			<div className="flex flex-1 flex-col gap-12 text-justify text-lg">
				<p>
					Dealer oficial Mimaki Brasil, prestando consultoria personalizada para
					o mercado de impressão digital.
				</p>
				<p>
					Fornecimento de plotters digitais de grande formato. Extenso KNOW HOW
					em tecnologia solvente, sublimática, UVs e recorte.
				</p>
				<p>
					Suporte técnico altamente qualificado, com vasta experiência em
					suporte técnico e calibração, visando a satisfação dos nossos
					clientes.
				</p>

				<MoreButton href="#" className="mt-auto" />
			</div>

			<div className="flex-2 flex items-end justify-end pr-2">
				<div className="z-10 mb-[5%] h-[70%] translate-x-1/2 overflow-hidden rounded-xl">
					<Image
						height={1000}
						width={1000}
						src="https://www.isscomercio.com.br/images/sobre-2.jpg"
						alt=""
						className="h-full w-full object-cover transition-transform duration-500 hover:-rotate-3 hover:scale-125"
					/>
				</div>
				<div className="h-[110%] overflow-hidden rounded-xl bg-[#eecaf8] py-12">
					<Image
						height={1000}
						width={1000}
						src="https://www.isscomercio.com.br/images/empresa/sobre-nos-1.jpg"
						alt=""
						className="aspect-square w-full object-contain transition-transform duration-500 hover:translate-x-10 hover:rotate-6 hover:scale-150"
					/>
				</div>
			</div>
		</div>
	);
};

export { AboutUs };
