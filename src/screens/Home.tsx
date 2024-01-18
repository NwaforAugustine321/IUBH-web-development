'use client';
import LottieLoader from '@/components/ui/loaders/LottieLoader';
import homeLoader from '@/assest/home-loader.json';
import { searchBook } from '@/services/book-api-services';
import { Circles } from 'react-loader-spinner';
import { useState } from 'react';
import { VscStarFull } from 'react-icons/vsc';
import { useRouter } from 'next/navigation';
import withAuth from '@/hoc/withAuth';
import {
  bookMark,
  getBookmarkedBooks,
  unBookMark,
} from '@/services/supabase-server';
import { useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useRef } from 'react';

const HomeScreen = () => {
  const history = useRouter();
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [markedBooks, setMarkedBooks] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const bookMarkedRef = useRef(null) as any;
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const [bookDetails, setBookDetails] = useState<any | null>(null);

  const searchInputChange = async (event: any) => {
    try {
      const value = event.target.value;
      if (value === '') {
        setBooks([]);
        return;
      }
      setQuery(value?.toLowerCase());
    } catch (error) {}
  };

  const search = async () => {
    try {
      setIsSearching(true);
      const data = await searchBook(query);
      console.log(data);
      setBooks(data.docs);
      setIsSearching(false);
    } catch (error) {
      setIsSearching(false);
      setBooks([]);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('iubh-user');
      history.push('/login');
    } catch (error) {}
  };

  const fetchBookmarkedBooks = async () => {
    try {
      const response = await getBookmarkedBooks();
      setMarkedBooks(response);
      if (bookMarkedRef.current) {
        bookMarkedRef?.current?.scrollIntoView!({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
    } catch (error) {}
  };

  const handleBookMark = async (book: any) => {
    try {
      setLoading(true);
      const payload = {
        authors: book.author_name,
        book_name: book.title,
      };
      await bookMark(payload);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      alert(error?.message);
    }
  };

  const handleUnBookMark = async (title: string) => {
    try {
      setLoading(true);
      const payload = {
        book_name: title,
      };
      await unBookMark(payload);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      alert(error?.message);
    }
  };

  const handleShowBookDetails = (book: any) => {
    setIsShowingDetails(true);
    setBookDetails(book);
  };

  useEffect(() => {
    fetchBookmarkedBooks();
  }, []);

  useEffect(() => {
    fetchBookmarkedBooks();
  }, [loading]);

  console.log(bookDetails);

  return (
    <main className='h-full flex w-full gap-[1rem] justify-center p-[1rem]'>
      <section className='max-w-[500px] w-full flex flex-col items-center'>
        <button
          onClick={logout}
          className='rounded-[5px] h-[34px] bg-gray-200 w-full mb-[1rem] py-[0.5rem] px-[0.5rem]'
        >
          Logout
        </button>
        <section className='mb-[1rem] flex flex-col lg:flex-row gap-[8px]  w-full items-center'>
          <input
            onChange={searchInputChange}
            type={'text'}
            className='w-full bg-black outline-0 appearance-none rounded-[5px] border-[1px] py-[0.5rem] px-[0.5rem] h-[34px] text-white'
            placeholder='Search latest books here'
          />
          <button
            onClick={search}
            className='w-full lg:w-[80px]  rounded-[5px] h-[34px] bg-gray-200 py-[0.5rem] px-[0.5rem]'
          >
            Search
          </button>
        </section>
        {isShowingDetails ? (
          <div className='w-full'>
            <button
              onClick={() => setIsShowingDetails(false)}
              className='rounded-[5px] h-[34px] bg-gray-200 w-[70px] mb-[1rem] py-[0.5rem] px-[0.5rem]'
            >
              Back
            </button>
            <h1 className='font-bold mb-[1rem] text-center'>Book details</h1>
            <h1 className='mb-[1rem]'>Book name : {bookDetails?.title}</h1>
            <h1 className='mb-[1rem]'>Author names:</h1>
            <ul>
              {bookDetails?.author_name?.map((author: any, index: number) => {
                return (
                  <li>
                    {index + 1}. {author}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <>
            {books.length > 0 ? (
              <ul className='h-[600px] w-full m-auto overflow-auto py-[1rem]'>
                {books.map((book: any, index: number) => {
                  const marked = markedBooks?.filter((mark: any) => {
                    return mark.book_name === book.title;
                  });

                  return (
                    <li
                      key={`${book.title}-${index}`}
                      className='cursor-pointer flex items-center justify-between  min-h-[20px] px-[1rem] py-[0.3rem] text-[1rem] bg-gray-200 text-black mb-[0.5rem] overflow-y-auto'
                    >
                      <span onClick={() => handleShowBookDetails(book)}>
                        {book?.title}{' '}
                      </span>
                      <span className='w-[max-content]'>
                        <VscStarFull
                          onClick={() => {
                            if (!marked.length) {
                              handleBookMark(book);
                            } else {
                              handleUnBookMark(book?.title);
                            }
                          }}
                          className={`${
                            marked.length && 'text-yellow-500'
                          } font-[1.4rem]`}
                        />
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : isSearching ? (
              <>
                <Circles
                  height='25'
                  width='25'
                  color='#4fa94d'
                  ariaLabel='circles-loading'
                  wrapperStyle={{}}
                  wrapperClass=''
                  visible={true}
                />
                <span className='font-bold mt-[0.4rem]'>Searching....</span>
              </>
            ) : (
              <LottieLoader
                className='flex justify-center items-center w-full h-full'
                option={{
                  loader: homeLoader,
                  height: 400,
                  width: 400,
                }}
              />
            )}
          </>
        )}
      </section>
      <section className='hidden w-full max-w-[600px] lg:block h-[330px] w-[350px] flex bg-black p-[1rem] overflow-auto'>
        <h1 className='text-[1.2rem] font-bold text-white mb-[1rem] text-center'>
          Bookmarked List
        </h1>
        <ul ref={bookMarkedRef}>
          {markedBooks.map((book: any, index: number) => {
            return (
              <li
                onClick={() => handleShowBookDetails(book)}
                key={`${book.book_name}-${index}`}
                className='cursor-pointer flex items-center justify-between  min-h-[20px] px-[1rem] py-[0.3rem] text-[1rem] bg-gray-200 text-black mb-[0.5rem] overflow-y-auto'
              >
                {book?.book_name}{' '}
                <span className='w-[max-content]'>
                  <MdDeleteForever
                    className='font-[1.4rem]'
                    onClick={() => {
                      handleUnBookMark(book.book_name);
                    }}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default withAuth(HomeScreen);
