type HeadingTitleProps = {
  title: string;
};

const HeadingTitle = ({ title }: HeadingTitleProps) => {
  return (
    <>
      <h2 className="text-center text-2xl">{title}</h2>
    </>
  );
};

export default HeadingTitle;
