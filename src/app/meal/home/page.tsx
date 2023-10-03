"use client";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Image from "next/image";

export default function Home() {
  const [randomRecipe, setRandomRecipe] = useState<any>(null);

  useEffect(() => {
    const storedRandomRecipe = localStorage.getItem("randomRecipe");
    if (storedRandomRecipe) {
      setRandomRecipe(JSON.parse(storedRandomRecipe));
    } else {
      async function fetchRandomRecipe() {
        try {
          const response = await fetch(
            "http://localhost:3000/api/recipe/random?altura=315&largura=215"
          );
          const data = await response.json();
          setRandomRecipe(data);

          localStorage.setItem("randomRecipe", JSON.stringify(data));
        } catch (error) {
          console.error("Erro ao buscar receita", error);
        }
      }
      fetchRandomRecipe();
    }
  }, []);
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
          className="w-[190px] h-[190px]"
        />
        <h1 className="text-black font-bold text-xl mr-2">
          O que vamos comer hoje?
        </h1>
      </div>
      <h2 className="text-black font-bold text-lg ml-6 mb-2">Sugestão:</h2>
      <div className="flex justify-center items-center w-full px-6">
        {randomRecipe ? (
          <Image
            src={randomRecipe.image?.imagem_url || ""}
            alt={randomRecipe.name || "imagem de comida"}
            width={200}
            height={200}
            className="w-full h-full rounded"
          />
        ) : (
          <p>Carregando receita...</p>
        )}
      </div>
    </div>
  );
}
