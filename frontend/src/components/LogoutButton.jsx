import { Button, useStatStyles } from '@chakra-ui/react';
import React from 'react';
import { FiLogOut } from "react-icons/fi";
import { useSetRecoilState } from 'recoil';
import userAtom from '../Atoms/userAtom';
import useShowToast from '../hooks/useShowToast';
import { useState } from 'react';

function LogoutButton() {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
    // const auth = getAuth(); // Initialize Firebase Auth object
    const [loading,setLoading]=useState(false)
    const handleLogout = async () => {
        setLoading(true)
        try {
            // await auth.signOut(); // Sign out the user using Firebase Auth
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            localStorage.removeItem("user-threads");
            setUser(null);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
        finally{
            setLoading(false)
        }
    };

    return (
        <Button marginLeft={"10px"} p={2} size={"md"} _hover={{bg:"gray.400"}} onClick={handleLogout} color={"gray.500"} isLoading={loading}>
            <FiLogOut size={20} />
        </Button>
    );
}

export default LogoutButton;
