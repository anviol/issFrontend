'use client';
import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { isEqual, startOfDay, closestTo, isAfter } from 'date-fns';

import { ChevronRight, Clock, MapPin } from 'lucide-react';
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

const SelectEvent = ({ data }: { data: TEvent[] }) => {
	const [selectedEvent, setSelectedEvent] = useState(
		data.find(({ dataInicio }) => {
			const closest = closestTo(
				new Date(),
				data
					.filter((e) => isAfter(e.dataFim, new Date()))
					.map((e) => e.dataInicio),
			);

			return closest && isEqual(dataInicio, closest);
		}) || data[0],
	);

	const handleSelectEvent: SelectRangeEventHandler = useCallback(
		(_, selectedDay) => {
			if (!selectedDay) return;
			const event = data.find(({ dataInicio }) =>
				isEqual(selectedDay, startOfDay(dataInicio)),
			);

			if (event) {
				setSelectedEvent(event);
			}
		},
		[data],
	);

	return (
		<div className="flex flex-col items-start gap-8 md:flex-row">
			<div className="flex w-full flex-wrap items-center justify-center gap-8 md:flex-col">
				<Calendar
					mode="range"
					modifiers={{
						booked: data.map((e) => e.dataInicio),
					}}
					selected={{
						from: selectedEvent.dataInicio,
						to: selectedEvent.dataFim,
					}}
					onSelect={handleSelectEvent}
					className="h-min w-full rounded-md bg-white shadow-lg sm:w-min"
				/>
				<div className="space-y-6">
					<Countdown target={selectedEvent.dataInicio} />
				</div>
			</div>

			<Card className="flex flex-col shadow-lg md:order-none">
				<CardHeader>
					<CardTitle>{selectedEvent.title}</CardTitle>
				</CardHeader>
				<CardContent className="flex-1 whitespace-pre-line">
					{selectedEvent.description}
				</CardContent>

				<Separator className="my-4" />

				<CardFooter className="flex flex-col items-start gap-2">
					<CardDescription className="flex items-center gap-2">
						<Clock />
						{selectedEvent.time}
					</CardDescription>
					<CardDescription className="flex items-center gap-2">
						<MapPin className="min-w-6" />
						{selectedEvent.locale}
					</CardDescription>
				</CardFooter>
			</Card>

			<Link
				href="#"
				className="my-auto flex w-full items-center justify-center rounded-full border-2 border-gray-500 md:flex md:w-min"
				title="Ver todos os eventos"
			>
				<span className="p-2 text-lg md:hidden">Ver evento</span>
				<ChevronRight className="hidden h-11 w-11 stroke-1 text-gray-500 md:block" />
			</Link>
		</div>
	);
};

export { SelectEvent };
