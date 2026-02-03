import React, {FC, useEffect, useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from "react-native";
import {useSQLiteContext} from "expo-sqlite";
import {useRouter} from "expo-router";
import {blogRepository} from "@/database/blog-repository";

type UpdateBlogModalProps = {
    id: number;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onUpdate: () => void;
}

const UpdateBlogModal: FC<UpdateBlogModalProps> = ({id, visible, setVisible}) => {
    const db = useSQLiteContext();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        loadBlog();
    }, []);

    const loadBlog = async () => {
        const blog = await blogRepository.getBlog(db, id);
        setTitle(blog?.title ?? '');
        setDescription(blog?.description ?? '')
    };

    const handleCreate = async () => {
        await blogRepository.updateBlog(db, id, title, description);
        setVisible(false);
        router.replace('/blogs');
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setVisible(false);
    };

    return (
        <Modal
            visible={visible}
            onRequestClose={handleClose}
        >
            <TextInput
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                value={description}
                onChangeText={setDescription}
            />

            <Pressable
                onPress={handleClose}
            >
                <Text>Отмена</Text>
            </Pressable>

            <Pressable
                onPress={handleCreate}
            >
                <Text>Сохрнаить</Text>
            </Pressable>
        </Modal>
    );
};

export default UpdateBlogModal;