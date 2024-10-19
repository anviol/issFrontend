'use client';

import React, { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';

const lineThickness = 4;
const lineHeight = 32;
const circleWidth = 96;
const circleThickness = 8;
const HEIGHT_OFFSET = lineHeight - lineThickness;
const WIDTH_OFFSET = circleWidth / 2 - lineThickness / 2;
const lineColorClassName = '[&_span]:text-yellow-400';

type Props = {
	data: {
		ano: string;
		descricao: string;
	}[];
};

export const TimeLine = ({ data }: Props) => {
	const [centeredBox, setCenteredBox] = useState<number | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			const circle = document.querySelectorAll('.year-circle');
			circle.forEach((box, index) => {
				const boxRect = box.getBoundingClientRect();

				const isInCenter =
					boxRect.top >= window.innerHeight / 2 - boxRect.height / 4 &&
					boxRect.top <= window.innerHeight / 2 + boxRect.height / 2;

				if (isInCenter) {
					setCenteredBox(index);
				}
			});
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="mx-auto py-4 pb-36 text-justify sm:max-w-[min(1000px,95%)]">
			{data.map((item, index) => {
				const start = index % 2 === 0; //true = esquerda; false = direita;
				const isFirst = index === 0;
				const isLast = index === data.length - 1;

				return (
					<div
						key={String(index)}
						className={`flex flex-col ${lineColorClassName} group`}
					>
						<TimeSection
							year={item.ano}
							description={item.descricao}
							isFirst={isFirst}
							isLast={isLast}
							isStart={start}
							isInCenter={centeredBox === index}
						/>

						<div
							className={`${isLast ? 'hidden' : 'flex'} max-[640px]:!pl-3 max-[640px]:!pr-3`}
							style={{
								paddingLeft: WIDTH_OFFSET,
								paddingRight: WIDTH_OFFSET,
							}}
						>
							<ConnectionLine start={start} orientation="up" />
							<ConnectionLine start={start} orientation="down" />
						</div>
					</div>
				);
			})}
		</div>
	);
};

const TimeSection = ({
	year,
	description,
	isInCenter,
	isFirst,
	isLast,
	isStart,
}: {
	year: string;
	description: string;
	isInCenter: boolean;
	isStart: boolean;
	isFirst: boolean;
	isLast: boolean;
}) => {
	return (
		<div className="year-circle relative flex overflow-hidden sm:gap-x-8 sm:overflow-visible">
			<div
				className={twJoin(
					`flex flex-col items-center max-[640px]:absolute max-[640px]:bottom-0 max-[640px]:top-0 sm:text-xl`,
					isStart
						? 'order-first max-[640px]:-left-[34px]'
						: 'order-last max-[640px]:-right-[34px]',
				)}
			>
				<span
					className={`${isFirst ? 'bg-transparent' : 'bg-current'} h-full min-h-10`}
					style={{ width: lineThickness }}
				/>
				<span
					className={twJoin(
						`flex aspect-square items-center rounded-full border-current bg-white p-2 font-semibold duration-300 sm:justify-center`,
						isStart ? 'justify-end' : 'justify-start',
						isInCenter ? 'sm:scale-125' : 'scale-100',
					)}
					style={{ width: circleWidth, borderWidth: circleThickness }}
				>
					<div className={`text-gray-600`}>{year}</div>
				</span>
				<span
					className={`h-full min-h-10 ${isLast ? 'bg-transparent' : 'bg-current'}`}
					style={{ width: lineThickness }}
				/>
			</div>
			<p
				className={twJoin(
					`my-auto py-8 leading-8 duration-500 sm:max-w-[70%] sm:px-0`,
					isStart
						? 'mr-auto origin-left px-4 pl-20 sm:pl-0'
						: 'ml-auto origin-right px-4 pr-20 sm:pr-0',
					isInCenter ? 'opacity-100 sm:scale-[1.01]' : 'scale-100 opacity-30',
				)}
			>
				{description}
			</p>
		</div>
	);
};

function ConnectionLine({
	start,
	orientation,
}: {
	start: boolean;
	orientation: 'up' | 'down';
}) {
	return (
		<div
			className={twJoin(`flex w-full`, start ? 'scale-100' : '-scale-y-100')}
			style={{
				paddingTop: orientation === 'down' ? HEIGHT_OFFSET : 0,
			}}
		>
			<span
				className={twJoin(
					'w-full border-current',
					orientation === 'up' ? 'rounded-bl-full' : 'rounded-tr-full',
				)}
				style={{
					borderBottomWidth: orientation === 'up' ? lineThickness : 0,
					borderLeftWidth: orientation === 'up' ? lineThickness : 0,
					borderTopWidth: orientation === 'down' ? lineThickness : 0,
					borderRightWidth: orientation === 'down' ? lineThickness : 0,
					height: lineHeight,
				}}
			/>
		</div>
	);
}
