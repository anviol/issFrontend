import ReactMarkdown, { Options } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { twMerge } from 'tailwind-merge';

type Props = Omit<Options, 'children' | 'rehypePlugins'> & {
	text: string;
	className?: string;
};

// O react-markdown 10 não aceita mais className. A div faz o papel do invólucro que ele criava.
export function RawToMarkdown({
	text,
	className,
	components,
	...props
}: Props) {
	return (
		<div className={twMerge('[&>*]:all-revert', className)}>
			<ReactMarkdown
				rehypePlugins={[rehypeRaw]}
				components={{
					a: ({ node: _node, children, className, ...props }) => {
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
		</div>
	);
}
