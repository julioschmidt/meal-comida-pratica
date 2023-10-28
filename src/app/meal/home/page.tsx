"use client";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { BeerBottle, Bird, Cookie, CookingPot, Fish, Flower, Hamburger, Knife, Timer, User } from "phosphor-react";


export default function Home() {
  const mobileClasses = "md:flex-col items-center md:w-full";
  const desktopClasses = "md:flex-row items-center w-full";

  const [recipe, setRecipe] = useState<any>(null);

  async function fetchRandomRecipe() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/recipe/random?altura=840&largura=480"
      );
      const data = await response.json();
      setRecipe(data);

      localStorage.setItem("randomRecipe", JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao buscar receita", error);
    }
  }

  useEffect(() => {
    const storedRandomRecipe = localStorage.getItem("randomRecipe");
    if (storedRandomRecipe) {
      setRecipe(JSON.parse(storedRandomRecipe));
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
      <div className={`flex justify-between items-center ${mobileClasses}`}>
        <Image
          src="/images/frigideira.svg"
          alt="meal"
          width={300}
          height={300}
          className="w-[190px] h-[190px] md:hidden lg:hidden transition-transform transform hover:scale-110 all ease-in-out duration-500"
        />
        <h1 className="text-black font-bold text-2xl mr-10">
          O que vamos comer hoje?
        </h1>
      </div>
      <h2 className={`flex justify-center items-center text-2xl text-bold text-black w-full px-6 ${desktopClasses}`}>
        {recipe ? recipe.name : "Sugestão:"}</h2>
      <div className={`flex justify-center items-center w-full px-6 ${desktopClasses}`}>
        {recipe ? (
          <div className="w-full max-w-screen-lg">
            <Image
              src={recipe.image?.imagem_url || ""}
              alt={recipe.name || "imagem de comida"}
              width={500}
              height={500}
              className="w-full h-full rounded transition-transform transform hover:scale-[1.02] all ease-in-out duration-500"
            />
            <div id="recipe-info" className="flex justify-center gap-10 mt-3">
              <div id="cooking-time" className="flex items-center gap-2">
                <Timer size={32} color="#22c55e" />
                <p className="text-black">{recipe.cooking_time}</p>
              </div>
              <div id="category" className="flex items-center gap-2">
                {recipe.category === 'bebidas' && <BeerBottle size={32} color="#22c55e" />}
                {recipe.category === 'molhos' && <CookingPot size={32} color="#22c55e" />}
                {recipe.category === 'carnes' && <Knife size={32} color="#22c55e" />}
                {recipe.category === 'paes' && <Hamburger size={32} color="#22c55e" />}
                {recipe.category === 'saladas' && <Flower size={32} color="#22c55e" />}
                {recipe.category === 'legumes' && <Flower size={32} color="#22c55e" />}
                {recipe.category === 'bolos' && <Cookie size={32} color="#22c55e" />}
                {recipe.category === 'peixes-e-frutos-do-mar' && <Fish size={32} color="#22c55e" />}
                {recipe.category === 'lanches' && <Hamburger size={32} color="#22c55e" />}
                {recipe.category === 'sopas' && <CookingPot size={32} color="#22c55e" />}
                {recipe.category === 'risotos' && <CookingPot size={32} color="#22c55e" />}
                {recipe.category === 'aperitivos-e-antepastos' && <CookingPot size={32} color="#22c55e" />}
                {recipe.category === 'massas' && <CookingPot size={32} color="#22c55e" />}
                {recipe.category === 'acompanhamentos' && <CookingPot size={32} color="#22c55e" />}
                {recipe.category === 'aves' && <Bird size={32} color="#22c55e" />}
                {recipe.category === 'doces' && <Cookie size={32} color="#22c55e" />}
                <p className="text-black">{recipe.category}</p>
              </div>
              <div id="portions" className="flex items-center gap-2">
                <User size={28} color="#22c55e" />
                <p className="text-black">{recipe.portions} porcões </p>
              </div>
            </div>
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

