import { get } from '@/utils/request';

export const searchBook = async (query: string, filter?: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BOOK_API}?q=${query}&sort=new`;
    const response = await get(url, {});
    return response?.data;
  } catch (error) {}
};
