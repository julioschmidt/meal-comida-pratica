"use client"
import Header from "@/app/components/Header";
import {
    SimpleGrid,
    Card,
    CardBody,
    Text,
    Select,
    Stack,
    Button,
    Heading,
    CardFooter,
    Divider,
    Image,
    ButtonGroup,
    IconButton,
} from '@chakra-ui/react'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { TrashSimple } from "phosphor-react";

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

            <div id="search-container" className="mt-6 ml-6 mr-6 flex flex-col gap-2">
                <Select placeholder='Selecione um ingrediente'
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
                <Button onClick={handleAddToArmazem} size="md"
                    colorScheme='teal' variant='outline'
                    className="mr-10 w-[100px]">
                    Adicionar
                </Button>
            </div>
            <SimpleGrid spacing={4} className="mt-10" templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {armazem &&
                    armazem.map((ingredient) => (
                        <Card key={ingredient.ingredient_id} maxW='sm'>
                            <CardBody>
                                <Image
                                    src="https://images.unsplash.com/photo-1628543108325-1c27cd7246b3?auto=format&fit=crop&q=80&w=1287&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="meat dish"
                                    borderRadius='lg'
                                    height={200}
                                    width={200}
                                />
                                <Stack mt='3' spacing='3'>
                                    <Heading size='md'>{ingredient.ingredients.name}</Heading>
                                </Stack>
                                <IconButton
                                    variant='ghost'
                                    className="mt-2"
                                    colorScheme='red'
                                    aria-label='Call Sage'
                                    onClick={() => handleDeleteArmazemItem(ingredient.ingredient_id)}
                                    fontSize='20px'
                                    icon={<TrashSimple size={32} color="#dfb693" weight="duotone" />
                                    }
                                />
                            </CardBody>
                        </Card>
                    ))}
            </SimpleGrid>
        </div >
    )
}

