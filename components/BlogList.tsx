import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from "react-native";
import {IBlog} from "@/types/blog";
import BlogItem from "@/components/BlogItem";
import {useFocusEffect} from "expo-router";
import {blogRepository} from "@/database/blog-repository";
import {useSQLiteContext} from "expo-sqlite";

const BlogList = () => {
    const db = useSQLiteContext();

    const [blogs, setBlogs] = useState<IBlog[]>([]);

    useFocusEffect(() => {
        loadBlogs();
    });

    const loadBlogs = async () => {
        const newBlogs = await blogRepository.getBlogs(db);
        setBlogs(newBlogs);
    };

    return (
        <View>
            <Text>Мои блоги</Text>

            <FlatList
                data={blogs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <BlogItem blog={item} />}
            />
        </View>
    );
};

export default BlogList;