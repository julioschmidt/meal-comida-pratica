"use client"
import Header from "@/app/components/Header";
import {
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    Text,
    Select,
    Box,
    Button,
} from '@chakra-ui/react'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";

export default function Armazem() {
    const [ingredients, setIngredients] = useState<any[]>([]);
    const [armazem, setArmazem] = useState<any[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<any | null>(null);

    const { data: session } = useSession()

    if (!session) {
        redirect('/login')
    }

    const handleAddToArmazem = async () => {
        if (selectedIngredient) {
            const response = await fetch("http://localhost:3000/api/armazem/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sessionEmail: session?.user?.email, ingredientsId: selectedIngredient.id }),
            });
            fetchArmazem();
        }
    };

    async function fetchArmazem() {
        try {
            const response = await fetch(
                "http://localhost:3000/api/armazem"
            );
            const data = await response.json();
            setArmazem(data);
        } catch (error) {
            console.error("Erro ao buscar receita", error);
        }
    }


    useEffect(() => {
        fetchArmazem();
    }, []);


    useEffect(() => {
        async function fetchIngredients() {
            try {
                if (localStorage.getItem("ingredients")) {
                    const ingredients = JSON.parse(localStorage.getItem("ingredients") || "[]");
                    setIngredients(ingredients);
                }
                const response = await fetch(
                    "http://localhost:3000/api/ingredients"
                );
                const data = await response.json();
                setIngredients(data.ingredients);

                localStorage.setItem("ingredients", JSON.stringify(data.ingredients));

            } catch (error) {
                console.error("Erro ao buscar receita", error);
            }
        }
        fetchIngredients();
    }, [])

    return (
        <div className="h-screen bg-white overflow-hidden">
            <div className="mb-4">
                <Header />
            </div>
            <div>
                <h3 className="text-[#545F71] ml-6 text-left text-2xl not-italic font-bold leading-[30px] tracking-[-0.48px]"> Seu armazem </h3>
            </div>

            <div id="search-container" className="mt-6 ml-6 flex flex-col gap-2">
                <Select placeholder='Selecione um ingrediente' style={{ width: "400px" }}
                    value={selectedIngredient ? selectedIngredient.id : ""}
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        const selected = ingredients.find((ingredient) => ingredient.id == selectedId);
                        setSelectedIngredient(selected);
                        console.log(session)
                    }}
                    className="border rounded-md text-black border-green-500">
                    {ingredients.map((ingredient, index) => (
                        <option key={index} value={ingredient.id}>
                            {ingredient.name}
                        </option>
                    ))}
                </Select>
                <Button onClick={handleAddToArmazem} className="text-black border rounded border-green-500 mr-10 w-[100px]">
                    Adicionar
                </Button>
            </div>
            <SimpleGrid spacing={4} className="mt-10" templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                <Card>
                    <CardHeader className="flex justify-center">
                        <div className="flex justify-center items-center w-[150px] h-[150px] bg-zinc-300"></div>
                    </CardHeader>
                    <CardBody className="text-black">
                        <Text className="text-2xl py-2 text-center"> Peixe </Text>
                    </CardBody>
                </Card>
                {armazem &&
                    armazem.map((ingredient) => (
                        <Card key={ingredient.ingredient_id}>
                            <CardHeader className="flex justify-center">
                                <div className="flex justify-center items-center w-[150px] h-[150px] bg-zinc-300"></div>
                            </CardHeader>
                            <CardBody className="text-black">
                                <Text className="text-2xl py-2 text-black text-center">{ingredient.ingredients.name}</Text>
                            </CardBody>
                        </Card>
                    ))}
            </SimpleGrid>
        </div >
    )
}

