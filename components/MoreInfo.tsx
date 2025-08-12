import Link from "next/link";

const MoreInfo = () => {
  return (
    <div className="flex gap-3">
      <h2>FAQ / visitez :</h2>
      {equipmentLinks.map((eqplk) => (
        <Link
          key={eqplk.id}
          className="text-[#4c5c92] underline"
          href={eqplk.link}
          target="_target"
        >
          {eqplk.brand}
        </Link>
      ))}
    </div>
  );
};

export default MoreInfo;

const equipmentLinks = [
  {
    id: 1,
    brand: "weeplow",
    link: "https://weeplow.com/",
  },
  {
    id: 2,
    brand: "nespresso",
    link: "https://nespresso.com/fr",
  },
  {
    id: 3,
    brand: "toputure",
    link: "https://toputure.org/",
  },
];
