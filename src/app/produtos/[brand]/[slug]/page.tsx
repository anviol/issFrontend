type Props = {
	params: { slug: string };
};

export default async function ProductDetail({ params: { slug } }: Props) {
	return (
		<div className="mx-auto mt-16 max-w-page">
			<h2 className="text-2xl font-medium sm:text-3xl">{slug}</h2>
		</div>
	);
}
