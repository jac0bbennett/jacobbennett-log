const LoadingIcon = (props: { bg?: string }) => {
  return (
    <div
      className="loading-icon"
      style={{ background: props.bg ?? '#fff' }}
    ></div>
  );
};

export default LoadingIcon;
