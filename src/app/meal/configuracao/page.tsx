'use client'
import Header from "@/app/components/Header";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
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

            <div>
                <Wrap>
                    <WrapItem>
                        <Avatar name="Andre Luiz" size='lg' className="bg-zinc-300" />
                    </WrapItem>
                </Wrap>
            </div>
        </div>
    )
}