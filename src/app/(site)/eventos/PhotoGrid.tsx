'use client';

import { KeyboardEvent, useCallback, useRef, useState } from 'react';

// Grade de fotos em linhas da mesma altura, cada uma ocupando a largura toda. O cálculo é o do
// react-grid-gallery 1.0.1 (licença MIT), que saiu do projeto por não funcionar no React 19.
// Mantém os mesmos números para a galeria continuar igual: linha de 180 px e margem de 2 px.

export type Photo = {
	src: string;
	width: number;
	height: number;
	album: string;
};

type PlacedPhoto = Photo & {
	scaledWidth: number;
	viewportWidth: number;
	marginLeft: number;
};

const ROW_HEIGHT = 180;
const MARGIN = 2;

// Quanto cortar de cada foto para a linha caber, proporcional à largura de cada uma.
function cutOff(row: PlacedPhoto[], rowWidth: number, excess: number) {
	const cuts = row.map((photo) => Math.floor((photo.scaledWidth / rowWidth) * excess));
	let left = excess - cuts.reduce((sum, cut) => sum + cut, 0);
	while (left > 0) {
		for (let i = 0; i < cuts.length; i++) {
			cuts[i]++;
			left--;
			if (left < 0) break;
		}
	}
	return cuts;
}

function buildLayout(photos: Photo[], containerWidth: number) {
	if (!containerWidth) return [];

	const placed: PlacedPhoto[] = [];
	const remaining = [...photos];

	while (remaining.length > 0) {
		const row: PlacedPhoto[] = [];
		let rowWidth = 0;

		while (remaining.length > 0 && rowWidth < containerWidth) {
			const photo = remaining.shift() as Photo;
			const scaledWidth = Math.floor(ROW_HEIGHT * (photo.width / photo.height));
			row.push({ ...photo, scaledWidth, viewportWidth: scaledWidth, marginLeft: 0 });
			rowWidth += scaledWidth + 2 * MARGIN;
		}

		const excess = rowWidth - containerWidth;
		if (excess > 0) {
			const cuts = cutOff(row, rowWidth, excess);
			row.forEach((photo, i) => {
				photo.marginLeft = -Math.abs(Math.floor(cuts[i] / 2));
				photo.viewportWidth = photo.scaledWidth - cuts[i];
			});
		}

		placed.push(...row);
	}

	return placed;
}

function useContainerWidth() {
	const observer = useRef<ResizeObserver | null>(null);
	const [width, setWidth] = useState(0);

	const ref = useCallback((node: HTMLDivElement | null) => {
		observer.current?.disconnect();
		observer.current = null;
		if (!node) return;

		const update = () => setWidth(Math.floor(node.getBoundingClientRect().width));
		update();
		observer.current = new ResizeObserver(update);
		observer.current.observe(node);
	}, []);

	return { ref, width };
}

type Props = {
	photos: Photo[];
	onOpen: (index: number) => void;
};

export function PhotoGrid({ photos, onOpen }: Props) {
	const { ref, width } = useContainerWidth();

	return (
		<div ref={ref}>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{buildLayout(photos, width).map((photo, index) => (
					<Tile key={index} photo={photo} index={index} onOpen={onOpen} />
				))}
			</div>
		</div>
	);
}

function Tile({
	photo,
	index,
	onOpen,
}: {
	photo: PlacedPhoto;
	index: number;
	onOpen: (index: number) => void;
}) {
	const [hover, setHover] = useState(false);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onOpen(index);
		}
	};

	return (
		<div
			className="photo-grid-tile"
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				margin: MARGIN,
				WebkitUserSelect: 'none',
				position: 'relative',
				background: '#eee',
				padding: 0,
			}}
		>
			<div
				style={{
					pointerEvents: 'none',
					opacity: hover ? 1 : 0,
					position: 'absolute',
					height: '100%',
					width: '100%',
				}}
			>
				<div className="flex h-full flex-col justify-end">
					<div className="bg-white/80">
						<div>{photo.album}</div>
					</div>
				</div>
			</div>
			<div
				role="button"
				tabIndex={0}
				aria-label={`Ampliar foto ${index + 1}, ${photo.album}`}
				onClick={() => onOpen(index)}
				onKeyDown={handleKeyDown}
				style={{
					width: photo.viewportWidth,
					height: ROW_HEIGHT,
					overflow: 'hidden',
				}}
			>
				<img
					src={photo.src}
					alt=""
					style={{
						cursor: 'pointer',
						maxWidth: 'none',
						width: photo.scaledWidth,
						height: ROW_HEIGHT,
						marginLeft: photo.marginLeft,
						marginTop: 0,
					}}
				/>
			</div>
		</div>
	);
}
