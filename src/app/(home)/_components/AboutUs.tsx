import Image from 'next/image';
import { MoreButton } from '@/components/MoreButton';

const AboutUs = () => {
	return (
		<div className="flex flex-col md:flex-row">
			<div className="flex flex-1 flex-col gap-6 text-justify leading-8 text-gray-500">
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

				<MoreButton href="/sobre" className="mt-auto" />
			</div>

			<div className="flex h-full flex-[2] items-end justify-end pr-2 sm:-mt-10">
				<div className="z-10 mb-[5%] h-[70%] w-[60%] translate-x-1/2 overflow-hidden rounded-xl lg:w-[40%]">
					<Image
						height={1000}
						width={1000}
						src="https://www.isscomercio.com.br/images/sobre-2.jpg"
						alt=""
						className="object-cover transition-transform duration-500 hover:-rotate-3 hover:scale-125"
					/>
				</div>
				<div className="w-[90%] overflow-hidden rounded-xl lg:w-1/2">
					<Image
						height={1000}
						width={1000}
						src="https://www.isscomercio.com.br/images/empresa/sobre-nos-1.jpg"
						alt=""
						className="h-full object-cover transition-transform duration-500 hover:translate-x-10 hover:rotate-6 hover:scale-150"
					/>
				</div>
			</div>
		</div>
	);
};

export { AboutUs };
