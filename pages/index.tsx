import Form from './app/client/BulkSubmitForm';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';

/**
 * Home component
 * @returns 
 */
const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-customBlack">
      <Head>
        <title>Batch Form</title>
      </Head>
      <div className='border-2 rounded-md border-solid border-customGolden p-[2vw] w-4/5 md:w-32 lg:w-1/3'>
        <h4 className="text-2xl font-bold dark:text-white mb-5">Batch Form</h4>
        <Form />
      </div>
    </div>
  );
};

export default Home;
