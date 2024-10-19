import { TimeLine } from './TimeLine';

export default async function AboutUs() {
	const data = await getData();

	return (
		<main className="h-full bg-[pageBgGray]">
			<div
				className="mb-32 h-72 w-full bg-cover bg-fixed bg-no-repeat [background-position:0%_20%]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://www.isscomercio.com.br/images/contato-01.jpg",
				}}
			/>

			<div className="mx-auto mb-16 max-w-page">
				<h2 className="text-4xl font-medium">Nossa história</h2>
			</div>

			<TimeLine data={data} />
		</main>
	);
}

const getData = async () => {
	return [
		{
			ano: '1996',
			descricao:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit',
		},
		{
			ano: '1999',
			descricao:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos',
		},
		{
			ano: '2003',
			descricao:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos.',
		},
		{
			ano: '2009',
			descricao:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos.',
		},
		{
			ano: '2015',
			descricao:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos.',
		},
		{
			ano: '2023',
			descricao:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum maxime odio debitis atque eaque autem odit tempora molestiae. Obcaecati iste ducimus repellendus debitis consectetur illo ipsum vitae mollitia quos.',
		},
	];
};
