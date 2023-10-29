"use client"
import Header from "@/app/components/Header";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Flex,
    FormControl,
    FormLabel,
    FormHelperText,
} from '@chakra-ui/react'
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";

import { PlusCircle, Trash } from "phosphor-react";
import { useEffect, useState } from "react";

export default function Armazem() {
    const [ingredients, setIngredients] = useState<any[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState("");
    const [tableIngredients, setTableIngredients] = useState([]);

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

            <div id="search-container" className="mt-6 ml-6 flex items-end gap-40">
                <div className="relative">
                    <div className="text-left text-black mb-2 text-xm font-normal leading-[30px]">Selecionar:</div>
                    <Flex justify="center" align="center" w="full">
                        <FormControl w="60">
                            <AutoComplete openOnFocus>
                                <AutoCompleteInput variant="filled"
                                    onChange={(e: any) => setSelectedIngredient(e.target.value)}
                                    className="bg-white border text-black border-gray-300" />
                                <AutoCompleteList bg="white">
                                    {ingredients.map((ingredient) => (
                                        <AutoCompleteItem
                                            key={`option-${ingredient.id}`}
                                            value={ingredient.name}
                                            textTransform="capitalize"
                                            className="text-black"
                                            bg="white"
                                        >
                                            {ingredient.name}
                                        </AutoCompleteItem>
                                    ))}
                                </AutoCompleteList>
                            </AutoComplete>
                        </FormControl>
                    </Flex>
                </div>
                <PlusCircle size={32} color="#102f4a" />
            </div>
            <div id="items" className="flex justify-center items-center mt-6">
                <table className="w-[350px] text-center">
                    <thead className="text-black">
                        <tr className="">
                            <th>Ingrediente</th>
                            <th>Quantidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-black text-center bg-zinc-200">
                        <tr>
                            <td>Queijo</td>
                            <td>30g</td>
                            <td className="flex justify-center items-center"><Trash size={24} color="#102f4a" /></td>
                        </tr>
                        {tableIngredients.map((ingredient, index) => (
                            <tr key={index}>
                                <td>{ingredient}</td>
                                <td>30g</td>
                                <td className="flex justify-center items-center">
                                    <Trash size={24} color="#102f4a" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

