'use client';
import { login } from '@/services/supabase-server';
import { useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

const loginDetails = {
  email: 'iubh-test-user@gmail.com',
  password: 'testing321',
};

const Login = (): React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const history = useRouter();
  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await login(loginDetails);
      const { access_token, user } = response;
      localStorage.setItem(
        'iubh-user',
        JSON.stringify({
          access_token,
          email: user?.email,
          id: user?.id,
        })
      );
      history.push('/');
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen w-screen p-[0.5rem]'>
      <h1 className='mb-[1rem] font-bold'>Login</h1>
      <form className='w-full max-w-[500px]  p-[1rem]'>
        <input
          type={'text'}
          defaultValue={loginDetails.email}
          className='block appearance-none outline-0 border-[1px] w-full mb-[1rem] p-[0.5rem] '
          placeholder='email'
        />
        <input
          type={'password'}
          defaultValue={loginDetails.password}
          className='block  appearance-none outline-0 border-[1px] w-full mb-[1rem] p-[0.5rem]'
          placeholder='password'
        />

        <button
          onClick={loginUser}
          className='w-full h-[34px] p-[0.5rem] bg-gray-200 text-black flex items-center justify-center'
          type='button'
        >
          {loading ? (
            <Circles
              height='15'
              width='15'
              color='#4fa94d'
              ariaLabel='circles-loading'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
            />
          ) : (
            'Login'
          )}
        </button>
      </form>
    </main>
  );
};

export default Login;
