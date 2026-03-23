import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const randomWidthPercentage = (
  { min, max }: { min: number; max: number } = { min: 30, max: 100 }
) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
