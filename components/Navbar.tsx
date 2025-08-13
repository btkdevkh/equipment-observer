import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-center">
        <Image
          src="/robot.png"
          width={200}
          height={200}
          alt="Logo"
          priority
          className="md:w-[300px]"
        />
      </div>
    </>
  );
};

export default Navbar;
