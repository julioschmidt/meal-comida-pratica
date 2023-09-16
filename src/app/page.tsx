import Image from "next/image";
import Button from "./components/Button";

export default function Home() {
  return (
    <main className="bg-green-500 h-screen flex flex-col justify-center items-center">
      <Image
        src="/icons/logo.svg"
        alt="Logo da empresa"
        width={226.36}
        height={182.57}
        className="py-5"
      />
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
        MEAL
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl pb-5">
        Comida Prática
      </p>
      <Button
        text="Iniciar"
        className="bg-gray-100 rounded-md justify-center items-center inline-flex h-10 px-4 py-3 w-[150px] text-slate-600 font-semibold leading-snug px-"
      />
    </main>
  );
}
