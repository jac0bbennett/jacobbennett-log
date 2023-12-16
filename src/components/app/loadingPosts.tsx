import LoadingIcon from './loadingIcon';

const LoadingPosts = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <LoadingIcon bg={'#000'} />
      <div className="mt-36" style={{ fontFamily: 'Montserrate' }}>
        Loading posts...
      </div>
    </div>
  );
};

export default LoadingPosts;
