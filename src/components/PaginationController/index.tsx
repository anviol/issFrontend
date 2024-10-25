'use client';
import { useCallback, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
	Pagination as PaginationController,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

type Props = {
	length: number;
};

export const Pagination = ({ length }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const pageParam = searchParams.get('pagina');
	const initialPage = typeof pageParam === 'string' ? Number(pageParam) : 1;

	const [page, setPage] = useState<number>(initialPage - 1);

	const handlePageChange = useCallback(
		(page: number) => {
			setPage(page);
			if (pathname) {
				router.push(`${pathname}?pagina=${page + 1}`);
			}
		},
		[pathname, router],
	);

	return (
		<PaginationController>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 0}
					/>
				</PaginationItem>
				<PaginationItem>
					<span className="mx-4">
						{page + 1} de {length}
					</span>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						onClick={() => handlePageChange(page + 1)}
						disabled={page === length - 1}
					/>
				</PaginationItem>
			</PaginationContent>
		</PaginationController>
	);
};
