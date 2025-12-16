'use client';

import { userProfileQueryOption } from '@/features/profile/profile.service';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  return useQuery({
    ...userProfileQueryOption(),
  });
};
