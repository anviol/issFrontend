import Image from 'next/image';
import { TImage } from '@/@types/products';
import { RawToMarkdown } from '@/components/ReactMarkdown';

type Props = {
	data: string;
	usages: NonNullable<TImage['data']>[];
	productName: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const MainContent = async ({ data, usages, productName }: Props) => {
	return (
		<div>
			<RawToMarkdown
				text={data}
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
			<div className="mt-4">
				<h3 className="py-4 text-lg font-semibold">
					Aplicações da {productName}
				</h3>
				<div className="grid max-w-full grid-cols-2 gap-4 md:grid-cols-4">
					{usages.map(({ attributes: att }, id) => (
						<div key={id} className="w-auto overflow-hidden rounded-lg">
							<Image
								src={`${baseUrl}${att.url}`}
								alt={att.alternativeText || ''}
								width={att.width}
								height={att.height}
								className="h-full w-full object-contain"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
