import { Section } from '../Section';
import { SelectEvent } from './SelectEvent';

export type TEvent = {
	id: string;
	dataInicio: Date;
	dataFim: Date;
	time: string;
	title: string;
	locale: string;
	description: string;
};

const CalendarEvents = async () => {
	const data = await getDate();

	return (
		<>
			{data.length > 0 && (
				<Section title="Próximos eventos">
					<SelectEvent data={data} />
				</Section>
			)}
		</>
	);
};

const getDate = async (): Promise<TEvent[]> => {
	try {
		return [
			{
				id: '1',
				dataInicio: new Date('2024-10-18'),
				dataFim: new Date('2024-10-20'),
				time: 'Das 14h às 20h',
				locale:
					'Av. Cel. José Dias Bicalho, 309 - São José, Belo Horizonte (Sede da ISS Comércio BH)',
				title: 'ISS Open House',
				description:
					'A ISS Comércio, distribuidor oficial da Mimaki, te convida para conhecer a nova sede em Belo Horizonte - BH!\n\n👉 Fique por dentro das mais recentes inovações em equipamentos, tecnologias e soluções para o mercado de impressão.',
			},
			{
				id: '2',
				dataInicio: new Date('2024-10-25'),
				dataFim: new Date('2024-10-29'),
				time: '10 a 13 de Julho - Quartas e Sextas - 13h às 20h e sábado 10h às 17h',
				locale: 'Expo Center Norte - São Paulo',
				title: 'Future Print',
				description:
					'🥳Está chegando a tão aguardada feira Future Print 2024 e, como tradição, a ISS Comércio estará presente no stand da Mimaki. ✔️Venha nos visitar e conhecer as últimas novidades em tecnologia de impressão. Novidades em equipamentos: veja de perto os lançamentos mais recentes e as soluções inovadoras da Mimaki.\n\nDemonstrações ao vivo: acompanhe demonstrações práticas e descubra o potencial das nossas impressoras. Consultoria especializada: converse com nossos especialistas e tire todas as suas dúvidas sobre produtos e aplicações. Networking: aproveite a oportunidade para fazer contatos e trocar experiências com profissionais do setor. 🥰Estamos ansiosos para recebê-los no nosso stand. Não perca essa oportunidade de conhecer as tendências que vão revolucionar o mercado de impressão!🖨',
			},
		];
	} catch (error) {
		return [];
	}
};

export { CalendarEvents };
