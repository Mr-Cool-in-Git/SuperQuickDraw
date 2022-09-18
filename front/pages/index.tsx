import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Link href={"/draw"}>
        <button className="py-2 px-4 rounded-xl bg-blue-700 text-2xl hover:bg-blue-900">
          Рисовать!
        </button>
      </Link>
    </div>
  );
};

export default Home;
