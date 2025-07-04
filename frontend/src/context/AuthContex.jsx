import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import toast, { Toaster } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);

    // Sign up
    const signUpNewUser = async (email, password) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            if (error.code === "user_already_exists") toast.error("Email already registered");
            else toast.error("An error occured please try again");
            
            console.error("there was a problem signing up", error);
            return {success: false, error};
        }

        return {success: true, data};
    }

    // Sign In
    const signInUser = async (email, password) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            if(error) {
                toast.error("Invalid Credentials");
                console.log("sign in error occured", error);
                return {success: false, error: error.message};
            }

            console.log("sign-in success: ", data);

            return {success: true, data};
        } catch (error) {
            toast.error("An error occured please try again");
            console.error("an error occured", error);
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, [])

    // Sign Out
    const signOut = () => {
        const {error} = supabase.auth.signOut();

        if (error) {
            toast.error("An error occured please try again");
            console.error("there was a problem signing out", error);
        }
    }

    return (
        <AuthContext.Provider  value = {{session, signUpNewUser, signOut, signInUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}