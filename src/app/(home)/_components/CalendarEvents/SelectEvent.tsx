'use client';
import Link from 'next/link';
import { isEqual, startOfDay } from 'date-fns';
import { ChevronRight, Clock, MapPin } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { TEvent } from '.';
import { useCallback, useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SelectEvent = ({ data }: { data: TEvent[] }) => {
	const [selectedEvent, setSelectedEvent] = useState(data[0]);

	const handleSelectEvent: SelectSingleEventHandler = useCallback(
		(day) => {
			if (!day) return;
			const event = data.find(({ date }) => isEqual(day, startOfDay(date)));

			if (event) {
				setSelectedEvent(event);
			}
		},
		[data],
	);

	return (
		<div className="flex flex-col gap-8 md:flex-row">
			<div className="flex flex-col justify-around gap-8 sm:flex-row">
				<Calendar
					mode="single"
					modifiers={{
						booked: data.map((e) => e.date),
					}}
					selected={selectedEvent.date}
					onSelect={handleSelectEvent}
					className="h-min rounded-md bg-white shadow-lg sm:w-min"
				/>
				<Link
					href="#"
					className="my-auto flex items-center justify-center rounded-full border-2 border-gray-500 p-2 px-12 text-lg text-gray-600 md:hidden"
					title="Ver todos os eventos"
				>
					Ver evento
				</Link>
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
						<MapPin />
						{selectedEvent.locale}
					</CardDescription>
				</CardFooter>
			</Card>

			<Link
				href="#"
				className="my-auto hidden w-min items-center justify-center rounded-full border-2 border-gray-500 md:flex"
				title="Ver todos os eventos"
			>
				<ChevronRight className="h-11 w-11 stroke-1 text-gray-500" />
			</Link>
		</div>
	);
};

export { SelectEvent };
