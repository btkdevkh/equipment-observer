import Link from "next/link";

const MoreInfo = () => {
  return (
    <>
      <h2>
        FAQ / visitez :{" "}
        <Link
          className="text-[#37436a]"
          href="https://weeplow.com/"
          target="_target"
        >
          weeplow.com
        </Link>
      </h2>
    </>
  );
};

export default MoreInfo;
