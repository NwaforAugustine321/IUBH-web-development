import Header from '../shared/Header';
import Footer from '../shared/Footer';
import { ReactNode } from 'react';

interface IProp {
  children: ReactNode;
}

const LandingPageLayout = ({ children }: IProp): React.ReactElement => {
  return (
    <main className=' flex flex-col items-center  min-h-screen  lg:flex-row  justify-center gap-[2rem] px-[1rem] py-[2rem]'>
      <section className='flex flex-col min-h-screen justify-center  w-full   '>
        <Header />
        <section className='grow w-full m-auto'>{children}</section>
        <Footer />
      </section>
      {/* max-w-[600px] <section className='hidden w-full max-w-[600px] lg:block h-[300px] w-[300px] flex bg-gray-200 p-[1rem]'>
        <h1 className='text-[1.2rem] font-bold'>Bookmarked List</h1>
      </section> */}
    </main>
  );
};

export default LandingPageLayout;
