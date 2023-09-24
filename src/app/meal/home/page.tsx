import Header from "../../components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen bg-white">
      <div className="mb-6">
        <Header />
      </div>
      <div className="flex justify-between items-center">
        <Image
          src="/images/frigideira.svg"
          alt="meal"
          width={500}
          height={500}
          className="w-[230px] h-[230px] rotate-[-15deg]"
        />
        <h1 className="text-black font-bold text-3xl mr-2">
          O que vamos comer hoje?
        </h1>
      </div>
    </div>
  );
}
