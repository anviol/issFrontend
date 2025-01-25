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
	params: { slug: string };
};

const Page = async ({ params }: Props) => {
	const { slug } = params;
	const data = await getData(slug);

	return (
		<div>
			<h1>Content for {slug}</h1>
			<RawToMarkdown
				text={data.attributes[slug]}
				className={'text-justify leading-9'}
				components={{
					h1: ({ children, className, ...props }) => {
						return (
							<h1
								className={
									'!rounded !bg-muted !p-1 !px-4 !text-base !font-semibold'
								}
								{...props}
							>
								{children}
							</h1>
						);
					},
				}}
			/>
		</div>
	);
};

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

export default Page;
