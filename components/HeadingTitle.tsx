type HeadingTitleProps = {
  title: string;
};

const HeadingTitle = ({ title }: HeadingTitleProps) => {
  return (
    <>
      <h2 className="text-xl text-center">{title}</h2>
    </>
  );
};

export default HeadingTitle;
