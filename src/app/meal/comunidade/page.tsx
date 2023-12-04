"use client";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {  Box, SimpleGrid, Avatar, FormControl, FormLabel, Input, Stack, Wrap, WrapItem, useCheckboxGroup, Text, Checkbox } from "@chakra-ui/react";
import { BeerBottle, Bird, Cookie, CookingPot, Fish, Flower, Hamburger, Knife, Timer, User } from "phosphor-react";

export default function Home() {
  const mobileClasses = "md:flex-col items-center md:w-full";
  const desktopClasses = "md:flex-row items-center w-full";
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

// fazer um array de receitas
  const [recipes, setRecipes] = useState<any[]>([]);

  async function fetchRandomRecipe() {
    try {
      let newRecipes = [];
      const response = await fetch(
        "http://localhost:3000/api/recipe/random?altura=840&largura=480"
      );  
      const data = await response.json();
      const category = data.category;
      console.log(category);
      newRecipes.push(data);
      for (let i = 0; i < 6; i++) {
        const response = await fetch(
          `http://localhost:3000/api/recipe/random/category?altura=840&largura=480&category=${category}`
        );  
        const data = await response.json();
        newRecipes.push(data);
      }
        setRecipes(newRecipes);
        localStorage.setItem("randomRecipes", JSON.stringify(newRecipes));
    } catch (error) {
      console.error("Erro ao buscar receita", error);
    }
  }

  async function fetchRandomUser() {
    try {
      let newRecipes = [];
      const response = await fetch(
        "http://localhost:3000/api/recipe/random?altura=840&largura=480"
      );  
      const data = await response.json();
      const category = data.category;
      console.log(category);
      newRecipes.push(data);
      for (let i = 0; i < 6; i++) {
        const response = await fetch(
          `http://localhost:3000/api/recipe/random/category?altura=840&largura=480&category=${category}`
        );  
        const data = await response.json();
        newRecipes.push(data);
      }
        setRecipes(newRecipes);
        localStorage.setItem("randomRecipes", JSON.stringify(newRecipes));
    } catch (error) {
      console.error("Erro ao buscar receita", error);
    }
  }

  useEffect(() => {
    const storedRandomRecipe = localStorage.getItem("randomRecipes");
    if (storedRandomRecipe) {
      setRecipes(JSON.parse(storedRandomRecipe));
    } else {
      fetchRandomRecipe();
    }
    // async function fetchRecipes() {
    //   try {
    //     if (localStorage.getItem("recipes"))
    //   }
    // }
    // fetchRecipes();
  }, []);

  const { data: session } = useSession()

  if (!session) {
    redirect('/login')
  }

  const handleSaveRecipe = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/recipe/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: recipes[0].id,
          userEmail: session?.user?.email,
          savedAt: new Date().toISOString().split('T')[0],
        }),
      });

      if (response.ok) {
        window.location.href = 'http://localhost:3000/meal/receita'
      } else {
        console.error("Erro ao salvar a receita");
      }
    } catch (error) {
      console.error("Erro ao salvar a receita", error);
    }
  };

  async function fetchUser() {
    try {
        const response = await fetch("http://localhost:3000/api/user");
        const data = await response.json();
        // console.log(data);
        setName(data.name);
        setUsername(data.username);
        
            // console.log(data.user_preferences);
    } catch (error) {
        console.error("Erro ao buscar usuário", error);
    }
}

useEffect(() => {
  fetchUser();
},[]);

if (!session) {
  // Redirect or handle unauthorized access here
  return null;
}

  return (
    <div className="h-screen bg-white">
      <div className="mb-2">
        <Header />
      </div>
      <h2 className={`text-center text-gray-600 mb-2 text-sm l`}> Seguindo  |  Pra você</h2>
      <div className={`${recipes ? 'border-2 border-slate-500 bg-slate-50' : ''}  mr-2 ml-2 p-2 rounded gap-4 mb-4`}>
        <div className={`flex flex-row`}>
          <div>
                <Wrap>
                    <WrapItem>
                        <Avatar name={name ? name : "João Pedro"}  size='md' bg='#71717A' />
                    </WrapItem>
                </Wrap>
          </div>
            <div className={`flex flex-col text-m text-left text-grey w-full ${desktopClasses}`}>
                 <h2>{name}</h2>
                 <h2>{(username ? "("+username+")" : "")}</h2>
            </div>
        </div>

        <h2 className={`flex justify-center items-center text-xl text-center text-bold text-black w-full px-6 ${desktopClasses}`}>
          {recipes[0] ? recipes[0].name : "Feed: "}
        </h2>

        <div className={`mt-1 flex justify-center items-center w-full px-6 ${desktopClasses}`}>
          {recipes[0] ? (
            <div className="w-full max-w-screen-lg">
              <Image
                src={recipes[0].image?.imagem_url || ""}
                alt={recipes[0].name || "imagem de comida"}
                width={200}
                height={200}
                className="w-full h-full rounded transition-transform transform hover:scale-[1.02] all ease-in-out duration-500"
              />
              <div id="recipes[0]-info-and-likes" className="flex flex-col justify-center align-center gap-3 mt-3"> 
                <div id="recipes[0]-info" className="flex flex-row justify-center align-center gap-3 mt-3">
                  <div id="category" className="flex items-center gap-2">
                    {recipes[0].category === 'bebidas' && <BeerBottle size={25} color="#22c55e" />}
                    {recipes[0].category === 'molhos' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[0].category === 'carnes' && <Knife size={25} color="#22c55e" />}
                    {recipes[0].category === 'paes' && <Hamburger size={25} color="#22c55e" />}
                    {recipes[0].category === 'saladas' && <Flower size={25} color="#22c55e" />}
                    {recipes[0].category === 'legumes' && <Flower size={25} color="#22c55e" />}
                    {recipes[0].category === 'bolos' && <Cookie size={25} color="#22c55e" />}
                    {recipes[0].category === 'peixes-e-frutos-do-mar' && <Fish size={25} color="#22c55e" />}
                    {recipes[0].category === 'lanches' && <Hamburger size={25} color="#22c55e" />}
                    {recipes[0].category === 'sopas' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[0].category === 'risotos' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[0].category === 'aperitivos-e-antepastos' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[0].category === 'massas' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[0].category === 'acompanhamentos' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[0].category === 'aves' && <Bird size={25} color="#22c55e" />}
                    {recipes[0].category === 'doces' && <Cookie size={25} color="#22c55e" />}
                    <p className="text-black">{recipes[0].category}</p>
                  </div>
                  <div className="flex align-center gap-10">
                    <div id="cooking-time" className="flex items-center gap-2">
                      <Timer size={25} color="#22c55e" />
                      <p className="text-black">{recipes[0].cooking_time}</p>
                    </div>

                    <div id="portions" className="flex items-center gap-2 margin-r">
                      <User size={25} color="#22c55e" />
                      <p className="text-black">{recipes[0].portions} porções</p>
                    </div>
                  </div>
                </div>
                <div className={`flex justify-center items-center w-full px-6 ${desktopClasses}`}>
                  {recipes[0] ? (
                    <div className="flex justify-center pt-3 gap-5">
                      <Image
                        src={"/icons/dislike-icon.png"}
                        alt={"Botão de não gostei"}
                        width={40}
                        height={40}
                        onClick={fetchRandomRecipe}
                        className="transition-transform transform hover:scale-110 all ease-in-out duration-500"
                      />
                      <Image
                        src={"/icons/like-icon.png"}
                        alt={"Botão de amei"}
                        width={40}
                        height={40}
                        onClick={handleSaveRecipe}
                        className="transition-transform transform hover:scale-110 all ease-in-out duration-500"
                      />
                    </div>
                  ) : ''}
                </div>
              </div>
            </div>
          ) : (
            <p>Carregando ...</p>
          )}
        </div>

      </div>
      <div className={`${recipes ? 'border-2 border-slate-500 bg-slate-50' : ''}  mr-2 ml-2 p-2 rounded gap-4 mb-4`}>
        <div className={`flex flex-row`}>
          <div>
                <Wrap>
                    <WrapItem>
                        <Avatar name={name ? name : "João Pedro"}  size='md' bg='#71717A' />
                    </WrapItem>
                </Wrap>
          </div>
            <div className={`flex flex-col text-m text-left text-grey w-full ${desktopClasses}`}>
                 <h2>{name}</h2>
                 <h2>{(username ? "("+username+")" : "")}</h2>
            </div>
        </div>

        <h2 className={`flex justify-center items-center text-xl text-center text-bold text-black w-full px-6 ${desktopClasses}`}>
          {recipes[1] ? recipes[1].name : "Feed: "}
        </h2>

        <div className={`mt-1 flex justify-center items-center w-full px-6 ${desktopClasses}`}>
          {recipes[1] ? (
            <div className="w-full max-w-screen-lg">
              <Image
                src={recipes[1].image?.imagem_url || ""}
                alt={recipes[1].name || "imagem de comida"}
                width={200}
                height={200}
                className="w-full h-full rounded transition-transform transform hover:scale-[1.02] all ease-in-out duration-500"
              />
              <div id="recipes[1]-info-and-likes" className="flex flex-col justify-center align-center gap-3 mt-3"> 
                <div id="recipes[1]-info" className="flex flex-row justify-center align-center gap-3 mt-3">
                  <div id="category" className="flex items-center gap-2">
                    {recipes[1].category === 'bebidas' && <BeerBottle size={25} color="#22c55e" />}
                    {recipes[1].category === 'molhos' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[1].category === 'carnes' && <Knife size={25} color="#22c55e" />}
                    {recipes[1].category === 'paes' && <Hamburger size={25} color="#22c55e" />}
                    {recipes[1].category === 'saladas' && <Flower size={25} color="#22c55e" />}
                    {recipes[1].category === 'legumes' && <Flower size={25} color="#22c55e" />}
                    {recipes[1].category === 'bolos' && <Cookie size={25} color="#22c55e" />}
                    {recipes[1].category === 'peixes-e-frutos-do-mar' && <Fish size={25} color="#22c55e" />}
                    {recipes[1].category === 'lanches' && <Hamburger size={25} color="#22c55e" />}
                    {recipes[1].category === 'sopas' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[1].category === 'risotos' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[1].category === 'aperitivos-e-antepastos' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[1].category === 'massas' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[1].category === 'acompanhamentos' && <CookingPot size={25} color="#22c55e" />}
                    {recipes[1].category === 'aves' && <Bird size={25} color="#22c55e" />}
                    {recipes[1].category === 'doces' && <Cookie size={25} color="#22c55e" />}
                    <p className="text-black">{recipes[1].category}</p>
                  </div>
                  <div className="flex align-center gap-10">
                    <div id="cooking-time" className="flex items-center gap-2">
                      <Timer size={25} color="#22c55e" />
                      <p className="text-black">{recipes[1].cooking_time}</p>
                    </div>

                    <div id="portions" className="flex items-center gap-2 margin-r">
                      <User size={25} color="#22c55e" />
                      <p className="text-black">{recipes[1].portions} porções</p>
                    </div>
                  </div>
                </div>
                <div className={`flex justify-center items-center w-full px-6 ${desktopClasses}`}>
                  {recipes[1] ? (
                    <div className="flex justify-center pt-3 gap-5">
                      <Image
                        src={"/icons/dislike-icon.png"}
                        alt={"Botão de não gostei"}
                        width={40}
                        height={40}
                        onClick={fetchRandomRecipe}
                        className="transition-transform transform hover:scale-110 all ease-in-out duration-500"
                      />
                      <Image
                        src={"/icons/like-icon.png"}
                        alt={"Botão de amei"}
                        width={40}
                        height={40}
                        onClick={handleSaveRecipe}
                        className="transition-transform transform hover:scale-110 all ease-in-out duration-500"
                      />
                    </div>
                  ) : ''}
                </div>
              </div>
            </div>
          ) : (
            <p>Carregando ...</p>
          )}
        </div>

      </div>


    </div>
  );
}

