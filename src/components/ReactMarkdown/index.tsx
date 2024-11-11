import ReactMarkdown, { Options } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { twMerge } from 'tailwind-merge';

type Props = Omit<Options, 'children' | 'rehypePlugins'> & {
	text: string;
};

export function RawToMarkdown({
	text,
	className,
	components,
	...props
}: Props) {
	return (
		<ReactMarkdown
			rehypePlugins={[rehypeRaw]}
			className={twMerge('[&>*]:all-revert', className)}
			components={{
				a: ({ children, className, ...props }) => {
					return (
						<a
							className={twMerge(
								'text-blue-500 underline dark:text-white',
								className,
							)}
							{...props}
						>
							{children}
						</a>
					);
				},
				...components,
			}}
			{...props}
		>
			{text}
		</ReactMarkdown>
	);
}
