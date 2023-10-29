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
    CloseButton,
} from '@chakra-ui/react'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { XCircle } from "phosphor-react";

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

    const handleDeleteArmazemItem = async (ingredientId: string | number) => {
        const response = await fetch("http://localhost:3000/api/armazem/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionEmail: session?.user?.email, ingredientsId: ingredientId }),
        });
        fetchArmazem()
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
                {armazem &&
                    armazem.map((ingredient) => (
                        <Card key={ingredient.ingredient_id}>
                            <CardHeader className="flex justify-center">
                                <div className="flex justify-end items-start w-[130px] h-[130px] bg-zinc-300">
                                    <CloseButton
                                        onClick={() => handleDeleteArmazemItem(ingredient.ingredient_id)}
                                        color="red" size='sm'
                                        className="mr-2 mt-2" />
                                </div>
                            </CardHeader>
                            <CardBody className="text-black">
                                <Text className="text-md py-2 text-black text-center">{ingredient.ingredients.name}</Text>
                            </CardBody>
                        </Card>
                    ))}
            </SimpleGrid>
        </div >
    )
}

