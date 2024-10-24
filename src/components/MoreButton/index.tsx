import Link, { LinkProps } from 'next/link';
import { ChevronRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = LinkProps & {
	className?: string;
	title?: string;
};
const MoreButton = ({ className, title, ...props }: Props) => {
	return (
		<Link
			{...props}
			className={twMerge(
				'flex w-min items-center gap-1 whitespace-nowrap rounded-md p-2 py-2 pr-1 text-black underline-offset-2 opacity-70 transition-all hover:bg-gray-100 hover:opacity-90',
				className,
			)}
		>
			{title || 'Saiba mais'}
			<ChevronRight className="h-5 w-5 text-gray-700" />
		</Link>
	);
};

export { MoreButton };
