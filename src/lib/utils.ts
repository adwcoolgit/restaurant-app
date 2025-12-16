import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import noImage from '@/../public/images/no-image-available.svg';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeImageSrc(src?: string, fallback: string = noImage) {
  if (!src || typeof src !== 'string') return fallback;

  try {
    const url = new URL(src);
    return url.href.toString();
  } catch (_) {}
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
}
