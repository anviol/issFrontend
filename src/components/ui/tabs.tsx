'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
	React.ComponentRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			'flex w-full items-center justify-center rounded bg-gray-100 p-1 text-muted-foreground',
			className,
		)}
		{...props}
	/>
));

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
	React.ComponentRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, onPointerDown, onBlur, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		// O Radix foca a aba no clique, e o Chrome trata esse foco como de teclado, com o anel.
		// A marca data-clique esconde o anel até a aba perder o foco; pelo teclado ele aparece.
		onPointerDown={(event) => {
			event.currentTarget.dataset.clique = '';
			onPointerDown?.(event);
		}}
		onBlur={(event) => {
			delete event.currentTarget.dataset.clique;
			onBlur?.(event);
		}}
		className={cn(
			'flex-1 items-center justify-center whitespace-nowrap rounded p-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[clique]:ring-0 data-[clique]:ring-offset-0 data-[state=active]:bg-issYellow data-[state=active]:text-foreground',
			className,
		)}
		{...props}
	/>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ComponentRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
			className,
		)}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
