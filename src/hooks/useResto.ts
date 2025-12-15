'use client';

import { restoQueryOption } from '@/features/detail/detail.service';
import { useQuery } from '@tanstack/react-query';

export const useResto = (id: string) => {
  return useQuery({
    ...restoQueryOption(id),
  });
};
