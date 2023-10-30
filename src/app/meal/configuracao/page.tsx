'use client'
import Header from "@/app/components/Header";
import { Avatar, FormControl, FormLabel, Input, Stack, Wrap, WrapItem, useCheckboxGroup, Text, Checkbox } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";


export default function Configuracao() {
    const [userProfile, setUserProfile] = useState({
        name: "",
        username: "",
        foodCategories: [],
        prefersQuickRecipes: false,
    });

    const { data: session } = useSession();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = () => {
        // Send the user profile data to your backend for storage
        console.log("User profile data:", userProfile);
    };

    if (!session) {
        // Redirect or handle unauthorized access here
        return null;
    }

    return (
        <div className="h-screen bg-white overflow-hidden">
            <Header />
            <div className="flex justify-center items-center mt-10">
                <Wrap>
                    <WrapItem>
                        <Avatar name="Andre Luiz" size='lg' bg='#71717A' />
                    </WrapItem>
                </Wrap>
            </div>
            <div>
                <FormControl as='fieldset'>
                    <FormLabel as='legend'>Nome</FormLabel>
                    <Input type="text" name="nome" onChange={handleInputChange} />
                </FormControl>
                <FormControl as='fieldset'>
                    <FormLabel as='legend'>username</FormLabel>
                    <Input type="text" name="username" onChange={handleInputChange} />
                </FormControl>
                <FormControl as='fieldset'>
                    <FormLabel as='legend'></FormLabel>
                    <Stack spacing={5} direction='row'>
                        <Checkbox colorScheme='green' defaultChecked>
                            Checkbox
                        </Checkbox>
                        <Checkbox colorScheme='green' defaultChecked>
                            Checkbox
                        </Checkbox>
                    </Stack>
                </FormControl>
            </div>
        </div >
    )
}