import { RawToMarkdown } from '@/components/ReactMarkdown';

type Props = {
	data: string;
};

export const MainContent = async ({ data }: Props) => {
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
		</div>
	);
};
