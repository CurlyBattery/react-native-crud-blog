import React, {FC, useState} from 'react';
import {View, Text, Pressable} from "react-native";
import {IBlog} from "@/types/blog";
import UpdateBlogModal from "@/components/UpdateBlogModal";
import {useRouter} from "expo-router";
import {blogRepository} from "@/database/blog-repository";
import {useSQLiteContext} from "expo-sqlite";

type BlogItemProps = {
    blog: IBlog;
}

const BlogItem: FC<BlogItemProps> = ({blog}) => {
    const router = useRouter();
    const db = useSQLiteContext();

    const [visible, setVisible] = useState(false);

    const onOpen = () => {
        setVisible(true);
    };

    const onUpdate = () => {
        router.replace('/blogs');
    };

    const onDelete = async () => {
        await blogRepository.deleteBlog(db, blog.id);
    };

    return (
        <View>
            <Text>{blog.title}</Text>

            <Text>{blog.description}</Text>

            <Pressable
                onPress={onOpen}
            >
                <Text>Редактировать</Text>
            </Pressable>

            <Pressable
                onPress={onDelete}
            >
                <Text>Удалить</Text>
            </Pressable>

            {visible && <UpdateBlogModal visible={visible} setVisible={setVisible} id={blog.id} onUpdate={onUpdate} />}
        </View>
    );
};

export default BlogItem;