import React, {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';
import {View} from "react-native";
import {IUser} from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {userRepository} from "@/database/user-repository";
import {useSQLiteContext} from "expo-sqlite";

type AuthContextType = {
    user: IUser | null;
    login: (userId: number) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const db = useSQLiteContext();

    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const userId = await AsyncStorage.getItem('userId');
        if(userId) {
            const userData = await userRepository.getUserById(db, +userId!);
            if(userData) {
                setUser(userData);
            }
        }
    };

    const login = async (userId: number) => {
        await AsyncStorage.setItem('userId', userId.toString());
        const userData = await userRepository.getUserById(db, userId);
        if (userData) {
            setUser(userData);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('userId');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};


export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export default AuthProvider;
