"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { BookmarkSimple } from "phosphor-react";
import { ListItem, OrderedList, UnorderedList } from "@chakra-ui/react";

export default function Receita() {
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

    const handleSaveRecipe = async () => {
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
                console.log("Receita salva com sucesso!");
            } else {
                console.error("Erro ao salvar a receita");
            }
        } catch (error) {
            console.error("Erro ao salvar a receita", error);
        }
    };

    return (
        <div className="h-full bg-white">
            <div className="mb-6">
                <Header />
            </div>
            <div className="mx-6 mb-6">
                <h1 className="text-black font-bold text-xl text-center"> {recipe?.name} </h1>
            </div>
            <div className="mx-6">
                <Image
                    src={recipe?.image?.imagem_url || ""}
                    alt={recipe?.name || "imagem de comida"}
                    width={200}
                    height={200}
                    className="w-full h-full rounded mb-2"
                />
                <div className="flex cursor-pointer" onClick={handleSaveRecipe}>
                    <BookmarkSimple size={20} color="#000000" />
                    <a className="text-black text-md ml-1"> Salvar </a>
                </div>
            </div>
            <div className="ml-6 mt-5 bg-white">
                <h2 className="text-black text-xl mb-2"> Ingredientes: </h2>
                <UnorderedList className="text-black">
                    {recipe?.ingredients_description.map((ingredient: any, index: any) => (
                        <ListItem key={index} className="marker:text-green-700">{ingredient}</ListItem>
                    ))}
                </UnorderedList>
            </div>

            <div className="ml-6 mt-10 text-black bg-white">
                <h2 className="text-xl mb-2"> Como preparar? </h2>
                <OrderedList p={2}>
                    {recipe?.instructions.map((ingredient: any, index: any) => (
                        <ListItem className="marker:text-green-700 marker:font-bold text-justify mr-4" key={index}>{ingredient}</ListItem>
                    ))}
                </OrderedList>
            </div>
        </div>
    )
}