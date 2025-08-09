type HeadingTitleProps = {
  title: string;
};

const HeadingTitle = ({ title }: HeadingTitleProps) => {
  return (
    <>
      <h2 className="text-2xl md:text-5xl text-center">{title}.</h2>
    </>
  );
};

export default HeadingTitle;
