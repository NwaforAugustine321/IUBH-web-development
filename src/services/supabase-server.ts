'use client';
import {
  IBookMark,
  ILogin,
  IRemoveBookMark,
} from '../interfaces/web-interface';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const login = async (payload: ILogin) => {
  try {
    const { email, password } = payload;
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw {
        message: 'Failed to login',
      };
    }

    return {
      ...data?.session,
    };
  } catch (error: any) {
    throw {
      message: error?.message ?? 'Failed to login',
    };
  }
};

export const getBookmarkedBooks = async () => {
  try {
    let { data: marked_books, error: selectError } = await supabase
      .from('marked_books')
      .select('book_name,id');

    if (selectError) {
      throw {
        message: 'Failed to fetch bookmarked books',
      };
    }

    return marked_books ?? [];
  } catch (error) {
    throw {
      message: 'Failed to fetch bookmarked books',
    };
  }
};

export const unBookMark = async (payload: IRemoveBookMark) => {
  try {
    const { error } = await supabase
      .from('marked_books')
      .delete()
      .eq('book_name', payload.book_name);

    if (error) {
      throw {
        message: 'Failed to remove the selected book',
      };
    }
  } catch (error: any) {
    throw {
      message: error?.message ?? 'Failed to remove the selected book',
    };
  }
};

export const bookMark = async (payload: IBookMark) => {
  try {
    let { data: marked_books, error: selectError } = await supabase
      .from('marked_books')
      .select('book_name,id')
      .eq('book_name', payload.book_name);

    if (selectError) {
      console.log(selectError, 'select');
      throw {
        message: 'Failed to bookmark the selected book',
      };
    }

    if (marked_books !== null && marked_books?.length > 0) {
      throw {
        message: 'Already bookmarked',
      };
    }

    const { data, error } = await supabase
      .from('marked_books')
      .insert([{ book_name: payload.book_name, authors: payload.authors }])
      .select();

    if (error) {
      throw {
        message: 'Failed to bookmark the selected book',
      };
    }
  } catch (error: any) {
    throw {
      message: error?.message ?? 'Failed to bookmark the selected book',
    };
  }
};
