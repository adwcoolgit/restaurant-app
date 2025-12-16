import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { queryOptions } from '@tanstack/react-query';
import { ApiResponse } from '@/types/global-types';
import { UserProfile } from './type';

export async function userProfileService(): Promise<UserProfile> {
  const { data } =
    await axiosInstance.get<ApiResponse<UserProfile>>(`/api/auth/profile`);

  return data.data as UserProfile;
}

export const userProfileQueryOption = () => {
  return queryOptions({
    queryKey: userProfileQueryKey(),
    queryFn: userProfileService,
    staleTime: 1000 * 60,
  });
};

export type UseUserProfileQueryParam = {
  queryConfig?: QueryConfig<typeof userProfileQueryOption>;
};

export const userProfileQueryKey = () => ['userProfile'];
