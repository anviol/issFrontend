'use client';

import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import {
	DayPicker,
	useDayPicker,
	type DayButtonProps,
	type MonthCaptionProps,
} from 'react-day-picker';
import { ptBR } from 'react-day-picker/locale';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// A partir da versão 9, o react-day-picker põe as classes de cada dia na célula da tabela, e
// as setas fora da legenda do mês. Os dois componentes abaixo devolvem o desenho de antes:
// setas dentro da legenda e o destaque do dia (selecionado, início e fim do período, evento)
// no próprio botão.
function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			locale={ptBR}
			labels={{
				labelNext: () => 'Próximo mês',
				labelPrevious: () => 'Mês anterior',
			}}
			showOutsideDays={showOutsideDays}
			hideNavigation
			className={cn('p-4', className)}
			classNames={{
				months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
				month: 'space-y-6',
				caption_label: 'text-sm font-medium capitalize',
				month_grid: 'md:w-full border-collapse space-y-1 w-min mx-auto',
				weekdays: 'flex',
				weekday: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
				week: 'flex w-full mt-2',
				day: cn(
					'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 aria-selected:bg-accent data-[outside=true]:aria-selected:bg-accent/50',
					props.mode === 'range'
						? 'first:aria-selected:rounded-l-md last:aria-selected:rounded-r-md'
						: 'aria-selected:rounded-md',
				),
				range_start: 'rounded-l-md',
				range_end: 'rounded-r-md',
				hidden: 'invisible',
				...classNames,
			}}
			components={{ MonthCaption, DayButton }}
			{...props}
		/>
	);
}
Calendar.displayName = 'Calendar';

function MonthCaption({
	calendarMonth: _calendarMonth,
	displayIndex: _displayIndex,
	className,
	children,
	...props
}: MonthCaptionProps) {
	const { previousMonth, nextMonth, goToMonth, labels } = useDayPicker();
	const navButton = cn(
		buttonVariants({ variant: 'outline' }),
		'absolute h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
	);

	return (
		<div
			className={cn('relative flex items-center justify-center pt-1', className)}
			{...props}
		>
			{children}
			<div className="flex items-center space-x-1">
				<button
					type="button"
					aria-label={labels.labelPrevious(previousMonth)}
					disabled={!previousMonth}
					onClick={() => previousMonth && goToMonth(previousMonth)}
					className={cn(navButton, 'left-1')}
				>
					<ChevronLeftIcon className="h-6 w-6" />
				</button>
				<button
					type="button"
					aria-label={labels.labelNext(nextMonth)}
					disabled={!nextMonth}
					onClick={() => nextMonth && goToMonth(nextMonth)}
					className={cn(navButton, 'right-1')}
				>
					<ChevronRightIcon className="h-6 w-6" />
				</button>
			</div>
		</div>
	);
}

function DayButton({
	day: _day,
	modifiers,
	className,
	...props
}: DayButtonProps) {
	const ref = React.useRef<HTMLButtonElement>(null);

	// Mantém o foco do teclado no dia, como o botão padrão da biblioteca.
	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<button
			ref={ref}
			className={cn(
				buttonVariants({ variant: 'ghost' }),
				'h-9 w-9 p-0 text-base font-normal',
				modifiers.selected &&
					'bg-issYellow font-semibold opacity-100 hover:bg-issYellow focus:bg-issYellow',
				modifiers.range_start && 'day-range-start rounded-r-none',
				modifiers.range_end && 'day-range-end rounded-l-none',
				modifiers.range_middle &&
					'rounded-none border-y-2 border-issYellow bg-issYellow/10 text-accent-foreground',
				modifiers.outside && 'day-outside text-muted-foreground opacity-50',
				modifiers.outside &&
					modifiers.selected &&
					'bg-accent/50 text-muted-foreground opacity-30',
				modifiers.disabled && 'text-muted-foreground opacity-50',
				modifiers.booked && 'border-2 border-issYellow',
				className,
			)}
			{...props}
		/>
	);
}

export { Calendar };
