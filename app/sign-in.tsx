import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from "react-native";
import {useRouter} from "expo-router";
import {useSQLiteContext} from "expo-sqlite";
import {userRepository} from "@/database/user-repository";
import {useAuth} from "@/components/AuthContext";

const SignInScreen = () => {
    const {login} = useAuth();
    const db = useSQLiteContext();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const existsUser = await userRepository.getUserByEmail(db, email);
        if(!existsUser || existsUser.password !== password) {
            alert('Неправильные данные');
            return;
        }
        await login(existsUser.id);

        setEmail('');
        setPassword('');
        router.replace('/(tabs)');
    };

    return (
        <View>
            <Text>Вход</Text>


            <TextInput
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                value={password}
                onChangeText={setPassword}
            />

            <Pressable
                onPress={handleLogin}
            >
                <Text>Вход</Text>
            </Pressable>
        </View>
    );
};

export default SignInScreen;