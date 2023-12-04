'use client'
import Header from "@/app/components/Header";
import { Avatar, Editable, FormControl, FormLabel, Input, Stack, Wrap, WrapItem, useCheckboxGroup, Text, Checkbox, Select, SimpleGrid } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../components/Button";
// import fetchIngredients from "../armazem/page";


export default function Configuracao() {
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [prefersQuickRecipes, setPreferesQuickRecipes] = useState<boolean>(false);
    const [prefersIntGluten, setPrefersIntGluten] = useState<boolean>(false);
    const [prefersIntLactose, setPrefersIntLactose] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState<any[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<any | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    // const [userProfile, setUserProfile] = useState({
    //     name: "",
    //     username: "",
        // foodCategories: [],
        // prefersQuickRecipes: false,
        // prefersIntLactose: false,
        // prefersIntGluten: false,
    // });

    const { data: session } = useSession();
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Send the user profile data to your backend for storage
        // console.log("User profile data:", userProfile);
        // tem que pegar o email no banco de dados
        if (isEditing) {
            const user = {
                name,
                username,
                sessionEmail: session?.user?.email,
                prefersQuickRecipes,
                prefersIntLactose,
                prefersIntGluten,
            };
            const response = await fetch("http://localhost:3000/api/user/update", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
        
            if (response.ok) {
                window.open("/meal/configuracao", "_self");
                console.log("ok"); //verificar algo para renderizar para usuario
            } else {
                console.log("not ok"); //verificar algo para renderizar para usuario
            }
        } else {
            toggleEditing();
        }
    }


    async function fetchUser() {
        try {
            const response = await fetch("http://localhost:3000/api/user");
            const data = await response.json();
            // console.log(data);
            setName(data.name);
            setUsername(data.username);
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

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }
    
    // console.log(prefersIntLactose);
    return (
        <div className="h-screen bg-white overflow-hidden">
            <Header />
            <div className="flex justify-center items-center mt-10">
                <Wrap>
                    <WrapItem>
                        <Avatar name={name ? name : "Andre Luiz"} /*"{Andre Luiz}"*/ size='lg' bg='#71717A' />
                    </WrapItem>
                </Wrap>
            </div>

            <div className="mt-10">
                <form onSubmit={handleSubmit}>
                    <FormControl isDisabled={!isEditing} as='fieldset' width="65%"  mx="auto" my={0}>
                        <FormLabel as='legend'>Nome</FormLabel>
                        <Input 
                        value={name}
                        focusBorderColor="green.300" type="text" name="name" onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <div className="pt-4">
                        <FormControl isDisabled={!isEditing} as='fieldset' width="65%" mx="auto" my={0}>
                            <FormLabel as='legend' >username</FormLabel>
                            <Input value={username} focusBorderColor="green.300" type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                        </FormControl>
                    </div>
                    <FormControl isDisabled={!isEditing} as='fieldset'>
                        <FormLabel pt={5} pb={3} mx="auto" my={0} as='legend'>Preferências</FormLabel>
                        <Stack spacing={5} direction='row' justifyContent="center">
                            <Checkbox 
                                isChecked={prefersQuickRecipes}
                                onChange={(e) => setPreferesQuickRecipes(e.target.checked)}
                                colorScheme='green'>
                                Receitas Rápidas
                            </Checkbox>
                            <Checkbox 
                            isChecked={prefersIntLactose}
                            onChange={(e) => setPrefersIntLactose(e.target.checked)}
                            colorScheme='green'>
                                Intolerante a lactose
                            </Checkbox>
                            <Checkbox
                            isChecked={prefersIntGluten}
                            onChange={(e) => setPrefersIntGluten(e.target.checked)}
                            colorScheme='green'>
                                Intolerante a glúten
                            </Checkbox>
                        </Stack>
                    </FormControl>

                    <div className="flex justify-center items-center mt-10">
                        <Button
                            type={"submit"}
                            text={isEditing ? "Salvar" : "Editar"}
                            className="text-white text-base font-semibold bg-green-500 rounded-md px-28 py-3 "
                            />
                    </div>
                </form>
            </div>

        </div >

    )
}