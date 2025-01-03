'use client';
import React, { useCallback, useState } from 'react';
import { isEqual, startOfDay, closestTo, isAfter } from 'date-fns';

import { Clock, MapPin } from 'lucide-react';
import { SelectRangeEventHandler } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { TEvent } from '.';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Countdown } from '@/components/FlipTimer';
import { RawToMarkdown } from '@/components/ReactMarkdown';
import { MoreButton } from '@/components/MoreButton';

function getNearestEvent(data: TEvent[]) {
	return (
		data.find(({ attributes: { inicio } }) => {
			const closest = closestTo(
				new Date(),
				data
					.filter(({ attributes: e }) => isAfter(e.fim, new Date()))
					.map(({ attributes: e }) => e.inicio),
			);

			return closest && isEqual(inicio, closest);
		}) || data[0]
	);
}

const SelectEvent = ({ data }: { data: TEvent[] }) => {
	const [selectedEvent, setSelectedEvent] = useState(getNearestEvent(data));

	const handleSelectEvent: SelectRangeEventHandler = useCallback(
		(_, selectedDay) => {
			if (!selectedDay) return;
			const event = data.find(({ attributes }) =>
				isEqual(selectedDay, startOfDay(attributes.inicio)),
			);

			if (event) {
				setSelectedEvent(event);
			}
		},
		[data],
	);

	return (
		<div className="flex flex-col items-start gap-8 md:flex-row">
			<div className="flex w-full flex-wrap items-center justify-center gap-8 md:w-auto md:flex-col">
				<Calendar
					mode="range"
					modifiers={{
						booked: data.map(({ attributes }) => new Date(attributes.inicio)),
					}}
					defaultMonth={new Date(selectedEvent.attributes.inicio)}
					selected={{
						from: new Date(selectedEvent.attributes.inicio),
						to: new Date(selectedEvent.attributes.fim),
					}}
					onSelect={handleSelectEvent}
					className="h-min w-full rounded-md bg-white shadow-lg sm:w-min"
				/>
				<div className="space-y-6">
					<Countdown target={new Date(selectedEvent.attributes.inicio)} />
				</div>
			</div>

			<Card className="flex w-full flex-col shadow-lg md:order-none">
				<CardHeader>
					<CardTitle>{selectedEvent.attributes.titulo}</CardTitle>
				</CardHeader>
				<CardContent className="flex-1 whitespace-pre-line">
					<RawToMarkdown
						text={selectedEvent.attributes.descricao}
						className={'text-justify leading-9'}
					/>
				</CardContent>

				<Separator className="my-4" />

				<CardFooter className="flex flex-col items-start gap-2">
					<CardDescription className="flex items-center gap-2">
						<Clock />
						{selectedEvent.attributes.horariodata}
					</CardDescription>
					<CardDescription className="flex items-center gap-2">
						<MapPin className="min-w-6" />
						{selectedEvent.attributes.localizacao}
					</CardDescription>
				</CardFooter>
			</Card>

			<MoreButton
				href={'/eventos'}
				className="my-auto ml-auto px-0 md:ml-0"
				title="Ver todos"
			/>
		</div>
	);
};

export { SelectEvent };
