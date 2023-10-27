"use client";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function Home() {
  const [randomRecipe, setRandomRecipe] = useState<any>(null);

  async function fetchRandomRecipe() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/recipe/random?altura=840&largura=480"
      );
      const data = await response.json();
      setRandomRecipe(data);

      localStorage.setItem("randomRecipe", JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao buscar receita", error);
    }
  }

  useEffect(() => {
    const storedRandomRecipe = localStorage.getItem("randomRecipe");
    if (storedRandomRecipe) {
      setRandomRecipe(JSON.parse(storedRandomRecipe));
    } else {
      fetchRandomRecipe();
    }
  }, []);

  const { data: session } = useSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="mb-6">
        <Header />
      </div>
      <div className="flex justify-between items-center">
        <Image
          src="/images/frigideira.svg"
          alt="meal"
          width={300}
          height={300}
          className="w-[190px] h-[190px] transition-transform transform hover:scale-110 all ease-in-out duration-500"
        />
        <h1 className="text-black font-bold text-2xl mr-10">
          O que vamos comer hoje?
        </h1>
      </div>
      <h2 className="text-black font-bold text-2xl text-center ml-6 mb-2">{randomRecipe ? randomRecipe.name : "Sugestão:"}</h2>
      <div className="flex justify-center items-center w-full px-6">
        {randomRecipe ? (
          <div className="w-full h-full">
            <Image
              src={randomRecipe.image?.imagem_url || ""}
              alt={randomRecipe.name || "imagem de comida"}
              width={500}
              height={500}
              className="w-full h-full rounded transition-transform transform hover:scale-[1.02] all ease-in-out duration-500"
            />
            <div className="flex justify-around pt-3">
              <Image
                src={"/icons/close-icon.svg"}
                alt={"Botão de não gostei"}
                width={56}
                height={56}
                onClick={fetchRandomRecipe}
                className="transition-transform transform hover:scale-110 all ease-in-out duration-500"
              />
              <Image
                src={"/icons/heart-icon.svg"}
                alt={"Botão de amei"}
                width={56}
                height={56}
                className="transition-transform transform hover:scale-110 all ease-in-out duration-500"
              />
              <Image
                src={"/icons/check-icon.svg"}
                alt={"Botão de gostei"}
                width={56}
                height={56}
                className="transition-transform transform hover:scale-110 all ease-in-out duration-500 "
                onClick={() => { window.location.href = 'http://localhost:3000/meal/receita' }}
              />
            </div>
          </div>
        ) : (
          <p>Carregando receita...</p>
        )}
      </div>
    </div>
  );
}

