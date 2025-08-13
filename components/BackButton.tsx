import Link from "next/link";

const BackButton = () => {
  return (
    <>
      <Link
        href="/"
        className="border-2 border-[#7FEBF8] bg-[#1a3b4f] py-2 px-4 w-fit font-bold rounded"
      >
        Retour
      </Link>
    </>
  );
};

export default BackButton;
