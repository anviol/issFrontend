import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function ensureHttps(url: string): string {
	if (!url.startsWith('https://')) {
		return `https://${url}`;
	}
	return url;
}
