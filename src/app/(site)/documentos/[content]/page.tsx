import { notFound } from 'next/navigation';
import { api } from '@/company-api/api';
import { RawToMarkdown } from '@/components/ReactMarkdown';

type TContentData = {
	data: {
		attributes: {
			[key: string]: string;
		};
	};
};

type Props = {
	params: { content: string };
};

export default async function DocumentsView({ params }: Props) {
	const { content: slug } = params;
	const data = await getData(slug);

	return (
		<div className="bg-pageBgGray">
			<RawToMarkdown
				text={data.attributes[slug.replace(/-/g, '_')]}
				className={
					'mx-auto max-w-page bg-white px-6 py-24 text-justify leading-9 md:px-24'
				}
			/>
		</div>
	);
}

const getData = async (slug: string) => {
	const { error, data } = await api<TContentData>({
		url: `/${slug}`,
		fetchOptions: {
			cache: 'no-store',
		},
	});

	if (error) {
		if (error.status === 404) return notFound();
	}

	return data;
};
