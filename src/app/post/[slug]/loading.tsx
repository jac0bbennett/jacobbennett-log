import Link from 'next/link';
import LoadingIcon from '../../../components/app/loadingIcon';

const Loading = () => {
  return (
    <>
      <div id="header">
        <div className="post-author">
          <Link href="/">{process.env.NAME}</Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center -mt-64">
        <LoadingIcon />
        <div
          className="mt-36 text-white font-medium opacity-70"
          style={{ fontFamily: 'Montserrat' }}
        >
          Loading Post...
        </div>
      </div>
      <div className="h-screen"></div>
    </>
  );
};

export default Loading;
