import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from "react-native";
import {blogRepository} from "@/database/blog-repository";
import {useRouter} from "expo-router";
import {useSQLiteContext} from "expo-sqlite";

const CreateBlogScreen = () => {
    const db = useSQLiteContext();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = async () => {
        await blogRepository.createBlog(db, title, description);
        setTitle('');
        setDescription('');
        router.replace('/blogs');
    };

    return (
        <View>

            <TextInput
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                value={description}
                onChangeText={setDescription}
            />

            <Pressable
                onPress={handleCreate}
            >
                <Text>Сохрнаить</Text>
            </Pressable>
        </View>
    );
};

export default CreateBlogScreen;