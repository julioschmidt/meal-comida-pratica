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
      <div className="flex justify-center items-center">
        <Image
          src={
            "https://img.cybercook.com.br/imagens/receitas/585/batatas-recheadas-com-frios-120x120.jpg"
          }
          alt={"imagem de comida"}
          width={328}
          height={212}
        />
      </div>
    </div>
  );
}
