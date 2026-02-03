import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from "react-native";
import {useRouter} from "expo-router";
import {useSQLiteContext} from "expo-sqlite";
import {userRepository} from "@/database/user-repository";
import {useAuth} from "@/components/AuthContext";

const SignUpScreen = () => {
    const {login} = useAuth();
    const db = useSQLiteContext();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const existsUser = await userRepository.getUserByEmail(db, email);
        if(existsUser) {
            alert('Пользователь уже существует');
            return;
        }

        const userId = await userRepository.createUser(db, name, email, password);
        await login(userId);
        router.replace('/(tabs)');
    };

    return (
        <View>
            <Text>Регистрация</Text>

            <TextInput
                value={name}
                onChangeText={setName}
            />

            <TextInput
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                value={password}
                onChangeText={setPassword}
            />

            <Pressable
                onPress={handleRegister}
            >
                <Text>Сохрнаить</Text>
            </Pressable>
        </View>
    );
};

export default SignUpScreen;