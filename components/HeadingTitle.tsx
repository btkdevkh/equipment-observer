type HeadingTitleProps = {
  title: string;
  supClass?: string;
};

const HeadingTitle = ({ title, supClass }: HeadingTitleProps) => {
  return (
    <>
      <h2 className={`text-center text-2xl ${supClass ? supClass : ""}`}>
        {title}
      </h2>
    </>
  );
};

export default HeadingTitle;
