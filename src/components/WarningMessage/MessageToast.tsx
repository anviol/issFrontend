'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useSessionStorage } from 'usehooks-ts';

import { WarningMessageProps } from '.';
import { api } from '@/company-api/api';
import { RawToMarkdown } from '../ReactMarkdown';

type Props = Awaited<ReturnType<typeof api<WarningMessageProps>>>;

export function WarningToast({ data, error }: Props) {
	const [show, setShow] = useState(false);
	const [dismissed, setDismissed] = useSessionStorage(
		'warning-message-dismissed',
		false,
	);

	// O servidor não conhece o sessionStorage. O aviso nasce escondido e só aparece depois de
	// montar, para não piscar para quem já o fechou.
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setShow(!dismissed);
	}, [dismissed]);

	const handleDismiss = () => {
		setDismissed(true);
	};

	if (error || !show) return null;

	return (
		<div
			className={`animate-grow-anim flex origin-top flex-col items-center justify-center border-b-0 border-issYellow bg-issYellow p-2 pb-6 opacity-95 drop-shadow-md`}
		>
			<button
				className="ml-auto rounded-full p-1 transition-colors hover:bg-black/20"
				onClick={handleDismiss}
				aria-label="Fechar aviso"
			>
				<X className="h-4 w-4" />
			</button>

			<div className="flex flex-col items-center justify-center">
				<strong>{data.attributes.titulo}</strong>
				<div className="flex flex-col items-center justify-center gap-8 px-2 md:flex-row md:px-24">
					<RawToMarkdown
						text={data.attributes.texto}
						className={'text-justify'}
					/>
					<button
						className="h-min rounded-md bg-gray-200 p-3 transition-all hover:brightness-90"
						onClick={handleDismiss}
					>
						Entendi
					</button>
				</div>
			</div>
		</div>
	);
}
