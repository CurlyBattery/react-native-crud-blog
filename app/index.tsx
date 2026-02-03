import React from 'react';
import {View, Text} from "react-native";
import {Link} from "expo-router";

const HomeScreen = () => {
    return (
        <View>
            <Text>Home</Text>

            <Link href={'/sign-up'}>Регистрация</Link>
            <Link href={'/sign-in'}>Вход</Link>
        </View>
    );
};

export default HomeScreen;