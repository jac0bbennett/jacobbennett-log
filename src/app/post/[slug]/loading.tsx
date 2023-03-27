import LoadingIcon from '../../../components/app/loadingIcon';

const Loading = () => {
  return (
    <>
      <div id="header">
        <div className="post-author">
          <a href="/">{process.env.NAME}</a>
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
