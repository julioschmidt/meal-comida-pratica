"use client";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { BeerBottle, Bird, Cookie, CookingPot, Fish, Flower, Hamburger, Knife, Timer, User } from "phosphor-react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";


export default function Home() {
  const mobileClasses = "md:flex-col items-center md:w-full";
  const desktopClasses = "md:flex-row items-center w-full";

  interface Recipe {
    id: number;
  }

// fazer um array de receitas
  const [recipes, setRecipes] = useState<any[]>([]);
  
  const [prefersQuickRecipes, setPreferesQuickRecipes] = useState<boolean>(false);
  const [prefersIntGluten, setPrefersIntGluten] = useState<boolean>(false);
  const [prefersIntLactose, setPrefersIntLactose] = useState<boolean>(false);
  // const [preferences, setPreferences] = useState({
  //   prefersQuickRecipes: false,
  //   preferesIntLactose: false,
  //   prefersIntGluten: false,
  // });

  async function fetchRandomRecipe() {
    try {
      let newRecipes = [];
      const response = await fetch(
        "http://localhost:3000/api/recipe/random?altura=840&largura=480"
      );  
      const data = await response.json();
      const category = data.category;
      console.log(data);
      newRecipes.push(data);
      for (let i = 0; i < 3; i++) {
        const response = await fetch(
              `http://localhost:3000/api/recipe/random/category?altura=840&largura=480&category=${category}&quick=${prefersQuickRecipes}&gluten=${prefersIntGluten}&lactose=${prefersIntLactose}`
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

  async function fetchUserPreferences() {
    try {
      const response = await fetch("http://localhost:3000/api/user");
      const data = await response.json();
      if (data.user_preferences && data.user_preferences.length > 0) {
        const userPreferences = data.user_preferences[0];
    
        if (userPreferences.quick_recipes !== null) {
            setPreferesQuickRecipes(userPreferences.quick_recipes);
        } else {
            setPreferesQuickRecipes(false);
        }
    
        if (userPreferences.lactose_intolerance !== null) {
            setPrefersIntLactose(userPreferences.lactose_intolerance);
        } else {
            setPrefersIntLactose(false);
        }
    
        if (userPreferences.gluten_intolerance !== null) {
            setPrefersIntGluten(userPreferences.gluten_intolerance);
        } else {
            setPrefersIntGluten(false);
        }
    } else {
        // Handle the case where user_preferences is undefined or empty
        setPreferesQuickRecipes(false);
        setPrefersIntLactose(false);
        setPrefersIntGluten(false);
    }
    } catch (error) {
      console.error("Erro ao buscar as preferências do usuário:", error);
    }
  }
  
  useEffect(() => {
    const storedRandomRecipe = localStorage.getItem("randomRecipes");
    if (prefersQuickRecipes !== null) {
      if (storedRandomRecipe) {
        setRecipes(JSON.parse(storedRandomRecipe));
      } else {
        fetchRandomRecipe();
      }
    }
    fetchUserPreferences();
  }, []);
  if (typeof window !== 'undefined') {
    localStorage.setItem("preferences", JSON.stringify([prefersQuickRecipes, prefersIntLactose, prefersIntGluten]));
  }
  
  const { data: session } = useSession()

  if (!session) {
    redirect('/login')
  }

  const handleSaveRecipe = async (recipe: Recipe) => {
    try {
      const response = await fetch("http://localhost:3000/api/recipe/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: recipe.id,
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

  return (
    <div className="h-screen bg-white">
      <div className="mb-6">
        <Header />
      </div>
      <div className={`flex justify-between items-center ${mobileClasses}`}>
        <Image
          src="/images/frigideira.svg"
          alt="meal"
          width={300}
          height={300}
          className="w-[170px] h-[170px] md:hidden lg:hidden transition-transform transform hover:scale-110 all ease-in-out duration-500"
        />
        <h1 className="text-black font-bold text-2xl mr-10">
          O que vamos comer hoje?
        </h1>
      </div>
      <div className={`${recipes ? 'border-2 border-slate-500 bg-slate-50' : ''}  mr-2 ml-2 p-2 rounded `}>
        <h2 className={`flex justify-center items-center text-xl text-center text-bold text-black w-full px-6 ${desktopClasses}`}>
          {recipes[0] ? recipes[0].name : "Sugestão:"}
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
              <div id="recipes[0]-info" className="flex flex-col justify-center align-center gap-3 mt-3">
                <div id="category" className="flex items-center gap-2">
                  {recipes[0].category === 'bebidas' && <BeerBottle size={32} color="#22c55e" />}
                  {recipes[0].category === 'molhos' && <CookingPot size={32} color="#22c55e" />}
                  {recipes[0].category === 'carnes' && <Knife size={32} color="#22c55e" />}
                  {recipes[0].category === 'paes' && <Hamburger size={32} color="#22c55e" />}
                  {recipes[0].category === 'saladas' && <Flower size={32} color="#22c55e" />}
                  {recipes[0].category === 'legumes' && <Flower size={32} color="#22c55e" />}
                  {recipes[0].category === 'bolos' && <Cookie size={32} color="#22c55e" />}
                  {recipes[0].category === 'peixes-e-frutos-do-mar' && <Fish size={32} color="#22c55e" />}
                  {recipes[0].category === 'lanches' && <Hamburger size={32} color="#22c55e" />}
                  {recipes[0].category === 'sopas' && <CookingPot size={32} color="#22c55e" />}
                  {recipes[0].category === 'risotos' && <CookingPot size={32} color="#22c55e" />}
                  {recipes[0].category === 'aperitivos-e-antepastos' && <CookingPot size={32} color="#22c55e" />}
                  {recipes[0].category === 'massas' && <CookingPot size={32} color="#22c55e" />}
                  {recipes[0].category === 'acompanhamentos' && <CookingPot size={32} color="#22c55e" />}
                  {recipes[0].category === 'aves' && <Bird size={32} color="#22c55e" />}
                  {recipes[0].category === 'doces' && <Cookie size={32} color="#22c55e" />}
                  <p className="text-black">{recipes[0].category}</p>
                </div>
                <div className="flex align-center gap-10">
                  <div id="cooking-time" className="flex items-center gap-2">
                    <Timer size={32} color="#22c55e" />
                    <p className="text-black">{recipes[0].cooking_time}</p>
                  </div>

                  <div id="portions" className="flex items-center gap-2">
                    <User size={28} color="#22c55e" />
                    <p className="text-black">{recipes[0].portions} porções</p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <p>Carregando receita...</p>
          )}
        </div>

      </div>

      <div className={` flex justify-center items-center w-full px-6 ${desktopClasses}`}>
        {recipes[0] ? (
          <div className="flex justify-around pt-3 gap-5">
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
              onClick={(e) => {handleSaveRecipe(recipes[0])}}
              className="transition-transform transform hover:scale-110 all ease-in-out duration-500"
            />
            <Image
              src={"/icons/check-icon.svg"}
              alt={"Botão de gostei"}
              width={56}
              height={56}
              className="transition-transform transform hover:scale-110 all ease-in-out duration-500 "
              onClick={() => { window.location.href = 'http://localhost:3000/meal/receita'}}
            />
          </div>
        ) : ''}
      </div>


          
      <div className={` w-full px-6 ${desktopClasses} mt-3 `} style={{textAlign: 'center'}}>
        {recipes[0] ? (
          <div className="flex justify-around pt-3">
            <h3 className="text-xl text-bold text-black">Outras sugestões de {recipes[0].category}:</h3>
          </div>
        ) : 'Nada ainda'}
      </div>

      <div className={`mt-1 flex justify-center items-center w-full px-6 ${desktopClasses}`}>
        <SimpleGrid minChildWidth="25vh" spacing={10}>
          {recipes.slice(1).map((recipe) => (

            <><div className={`${recipes ? 'border-2 border-slate-500 bg-slate-50' : ''}  mr-2 ml-2 p-2 rounded `}>
              <Box mb={10} key={recipe.id} height={250}>
                <Text textAlign="center">
                  {recipe ? recipe.name : "Carregando"}
                </Text>
                <Image
                  src={recipe.image?.imagem_url || ""}
                  alt={recipe.name || "imagem de comida"}
                  width={200}
                  height={200}
                  className="w-full h-full rounded transition-transform transform hover:scale-[1.02] all ease-in-out duration-500" />
                <div className="flex align-center gap-5">
                  <div id="cooking-time" className="flex items-center gap-2">
                    <Timer size={32} color="#22c55e" />
                    <p className="text-black">{recipe.cooking_time}</p>
                  </div>
                  <div id="portions" className="flex items-center gap-2">
                    <User size={28} color="#22c55e" />
                    <p className="text-black">{recipe.portions} porções</p>
                  </div>
                </div>
              </Box>
            </div>
            <div className="flex justify-around gap-5">
                <Image
                  src={"/icons/heart-icon.svg"}
                  alt={"Botão de amei"}
                  width={40}
                  height={40}
                  onClick={(e) => {handleSaveRecipe(recipe)}}
                  className="transition-transform transform hover:scale-110 all ease-in-out duration-500" />
                <Image
                  src={"/icons/check-icon.svg"}
                  alt={"Botão de gostei"}
                  width={40}
                  height={40}
                  className="transition-transform transform hover:scale-110 all ease-in-out duration-500 "
                  onClick={() => { 
                    localStorage.setItem('likedRecipe', JSON.stringify(recipe));
                    window.location.href = 'http://localhost:3000/meal/receita'; } } />
              </div>
              </>
          ))}
        </SimpleGrid>

      </div>




    </div>
  );
}

