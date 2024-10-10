'use client';
import Link from 'next/link';
import { isEqual, startOfDay } from 'date-fns';
import { ChevronRightCircle, Clock, MapPin } from 'lucide-react';

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
		<div className="flex gap-8">
			<Calendar
				mode="single"
				modifiers={{
					booked: data.map((e) => e.date),
				}}
				selected={selectedEvent.date}
				onSelect={handleSelectEvent}
				className="w-min rounded-md bg-white shadow-lg h-min"
			/>

			<Card className="flex flex-col shadow-lg">
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

			<Link href="#" className="my-auto" title="Ver todos os eventos">
				<ChevronRightCircle className="h-11 w-11 stroke-1 text-gray-500" />
			</Link>
		</div>
	);
};

export { SelectEvent };
