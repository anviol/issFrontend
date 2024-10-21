import {
	addDays,
	addHours,
	addMinutes,
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
	differenceInSeconds,
} from 'date-fns';

export function getDifference(date1: Date, date2: Date) {
	const days = differenceInDays(date1, date2);

	// Add back the days to calculate the remaining hours
	const remainingHoursDate1 = addDays(date2, days);
	const hours = differenceInHours(date1, remainingHoursDate1);

	// Add back the hours to calculate the remaining seconds
	const remainingMinutesDate1 = addHours(remainingHoursDate1, hours);
	const minutes = differenceInMinutes(date1, remainingMinutesDate1);

	const remainingSecondsDate1 = addMinutes(remainingMinutesDate1, minutes);
	const seconds = differenceInSeconds(date1, remainingSecondsDate1);

	return { days, hours, minutes, seconds };
}
