import { RootState, useSelector } from '@/store';

export const useUser = () => useSelector((state: RootState) => state.user);
