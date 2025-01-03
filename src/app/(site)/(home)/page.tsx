import { AboutUs } from './_components/AboutUs';
import { Advantages } from './_components/Advantages';
import { CalendarEvents } from './_components/CalendarEvents';
import { HomeCarousel } from './_components/HomeCarousel';
import { Products } from './_components/Products';
import { Section } from './_components/Section';
import { InstagramFeed } from '@/components/InstagramFeed';
import { ContactForm } from './_components/ContactForm';

export default function Home() {
	return (
		<main className="flex flex-col bg-white">
			<div className="bg-pageBgGray">
				<HomeCarousel />
			</div>

			<Section
				title="Destaques"
				className="max-w-page_lg [&>h2]:mx-auto [&>h2]:max-w-page"
			>
				<Products />
			</Section>

			<div className="bg-pageBgGray">
				<Section title="Sobre nós">
					<AboutUs />
				</Section>
			</div>

			<div className="bg-white">
				<Section title="Nosso diferencial">
					<Advantages />
				</Section>
			</div>

			<div className="bg-pageBgGray">
				<CalendarEvents />
			</div>

			<Section
				id="entre-em-contato"
				title="Entre em contato conosco"
				className="relative"
				jumpToClassName="-top-36 absolute"
			>
				<ContactForm />
			</Section>

			<div className="bg-pageBgGray">
				<Section title="Acompanhe a ISS nas redes sociais">
					<InstagramFeed />
				</Section>
			</div>
		</main>
	);
}
