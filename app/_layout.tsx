import { Stack } from "expo-router";
import {ReactElement, ReactNode, Suspense} from "react";
import {View, Text} from "react-native";
import {SQLiteProvider} from "expo-sqlite";
import {migrateDb} from "@/database";
import AuthProvider from "@/components/AuthContext";

export default function RootLayout() {
  return (
      <Suspense fallback={(<View><Text>Загрузка бд...</Text></View>)}>
          <SQLiteProvider
            databaseName={'blogs.db'}
            onInit={migrateDb}
            useSuspense
          >
              <AuthProvider>
                  <Stack>
                      <Stack.Screen name={'index'} options={{headerShown: true }} />
                      <Stack.Screen name={'(tabs)'} options={{headerShown: false }} />
                      <Stack.Screen name={'sign-up'} options={{headerShown: true, title: 'Регистрация' }} />
                  </Stack>
              </AuthProvider>

          </SQLiteProvider>
      </Suspense>

  );
}
