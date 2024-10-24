'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSpring, a } from '@react-spring/web';
import { getDifference } from '@/lib/date-utils';

const Countdown = ({ target }: { target: Date }) => {
	const [{ minutes, days, hours, seconds }, setDiff] = useState({
		minutes: 0,
		days: 0,
		hours: 0,
		seconds: 0,
	});

	useEffect(() => {
		setDiff(getDifference(target, new Date()));

		const event = setInterval(() => {
			setDiff(getDifference(target, new Date()));
		}, 1000);

		return () => {
			clearInterval(event);
		};
	}, [target]);

	return (
		<div className="flex items-center">
			<CardContainer
				value={String(days > 0 ? days : 0).padStart(2, '0')}
				label="DIAS"
			/>
			<Separator />
			<CardContainer
				value={String(hours > 0 ? hours : 0).padStart(2, '0')}
				label="HORAS"
			/>
			<Separator />
			<CardContainer
				value={String(minutes > 0 ? minutes : 0).padStart(2, '0')}
				label="MIN."
			/>
			<Separator />
			<CardContainer
				value={String(seconds > 0 ? seconds : 0).padStart(2, '0')}
				label="SEG."
			/>
		</div>
	);
};

const Separator = () => {
	return (
		<div className="mb-5 space-y-0">
			<div className="mx-1 h-1 w-1 rounded-full bg-gray-700" />
		</div>
	);
};

const CardContainer = ({ value, label }: { value: string; label: string }) => {
	return (
		<div title={`${value} ${label}`} className="">
			<div className="">
				<div className="relative flex rounded">
					<Card value={value.at(0) as string} />
					<Card value={value.at(1) as string} />
				</div>
			</div>
			<span className="mt-px block text-center text-sm font-medium tracking-tight text-gray-600">
				{label}
			</span>
		</div>
	);
};

const Card = ({ value }: { value: string }) => {
	const rotationRef = useRef(0);
	const [{ rotation, opacity }, set] = useSpring(() => ({
		rotation: 0,
		opacity: 1,
		config: { mass: 5, tension: 500, friction: 80 },
	}));

	const cardClassName =
		'absolute flex h-full items-center justify-end text-xl font-semibold border text-black/80 [will-change:transform,_opacity;] rounded-l w-full px-1.5 bg-gradient-to-b from-white to-gray-200';

	useEffect(() => {
		if (rotationRef.current === -180) {
			rotationRef.current = 0;
		} else {
			rotationRef.current -= 180;
		}

		set({
			rotation: rotationRef.current,
			opacity: rotationRef.current === 0 ? 0 : 1,
		});
	}, [value, set]);

	return (
		<div className="relative h-14 w-8 [&:last-child>*]:justify-start [&:last-child>*]:rounded-l-none [&:last-child>*]:rounded-r">
			<a.div
				className={cardClassName}
				style={{
					transform: rotation.to((r) => `rotateX(${r}deg)`),
					opacity: opacity.to((o) => 1 - o),
					zIndex: 10,
				}}
			>
				{value}
			</a.div>

			<a.div
				className={cardClassName}
				style={{
					opacity,
					transform: rotation.to((r) => `rotateX(${r}deg)`),
					rotateX: '180deg',
				}}
			>
				{value}
			</a.div>
		</div>
	);
};

export { Countdown };
