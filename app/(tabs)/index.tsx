import {Pressable, Text, View} from "react-native";
import {use} from "react";
import {useAuth} from "@/components/AuthContext";

export default function Index() {
    const {user, logout}= useAuth();
    console.log(user);

    const handleLogout = async () => {
        await logout();
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

        <Text>Hello, {user?.name}</Text>

        <Pressable
            onPress={handleLogout}
        >
            <Text>Выход</Text>
        </Pressable>
    </View>
  );
}
