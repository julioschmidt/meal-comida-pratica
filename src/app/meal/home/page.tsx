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
        {randomRecipe ? (
          <Image
            src={randomRecipe.image?.imagem_url || ""}
            alt={randomRecipe.name || "imagem de comida"}
            width={330}
            height={215}
          />
        ) : (
          <p>Carregando receita...</p>
        )}
      </div>
    </div>
  );
}
