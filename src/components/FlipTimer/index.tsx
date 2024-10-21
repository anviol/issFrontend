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
			<CardContainer value={days > 0 ? days : 0} label="DIAS" />
			<Separator />
			<CardContainer value={hours > 0 ? hours : 0} label="HORAS" />
			<Separator />
			<CardContainer value={minutes > 0 ? minutes : 0} label="MIN." />
			<Separator />
			<CardContainer value={seconds > 0 ? seconds : 0} label="SEG." />
		</div>
	);
};

const Separator = () => {
	return (
		<div className="mb-4 space-y-0">
			<div className="mx-0.5 h-1 w-1 rounded-full bg-gray-700" />
		</div>
	);
};

const CardContainer = ({ value, label }: { value: number; label: string }) => {
	return (
		<div title={`${value} ${label}`}>
			<Card value={value} />
			<span className="mt-px block text-center text-sm tracking-tight text-gray-600">
				{label}
			</span>
		</div>
	);
};

const Card = ({ value }: { value: number }) => {
	const rotationRef = useRef(0);

	const cardClassName =
		'absolute flex h-full items-center justify-around rounded bg-gradient-to-br from-white to-gray-200 text-xl font-semibold text-black before:bg-black/5 before:h-14 before:absolute before:w-px [will-change:transform,_opacity;] w-full px-1 border';

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
	}, [value]);

	const [{ rotation, opacity }, set] = useSpring(() => ({
		rotation: 0,
		opacity: 1,
		config: { mass: 5, tension: 500, friction: 80 },
	}));

	return (
		<div className="relative h-14 w-16 bg-pageBgGray">
			<a.div
				className={cardClassName}
				style={{
					transform: rotation.to((r) => `rotateX(${r}deg)`),
					opacity: opacity.to((o) => 1 - o),
					zIndex: 10,
				}}
			>
				<span>{String(value).padStart(2, '0').at(0)}</span>
				<span>{String(value).padStart(2, '0').at(1)}</span>
			</a.div>

			<a.div
				className={cardClassName}
				style={{
					transform: rotation.to((r) => `rotateX(${r}deg)`),
					rotateX: '180deg',
				}}
			>
				<span>{String(value).padStart(2, '0').at(0)}</span>
				<span>{String(value).padStart(2, '0').at(1)}</span>
			</a.div>
		</div>
	);
};

export { Countdown };
