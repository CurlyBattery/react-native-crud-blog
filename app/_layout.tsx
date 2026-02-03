import { Stack } from "expo-router";
import {ReactElement, ReactNode, Suspense} from "react";
import {View, Text} from "react-native";
import {SQLiteProvider} from "expo-sqlite";
import {migrateDb} from "@/database";

export default function RootLayout() {
  return (
      <Suspense fallback={(<View><Text>Загрузка бд...</Text></View>)}>
          <SQLiteProvider
            databaseName={'blogs.db'}
            onInit={migrateDb}
            useSuspense
          >
              <Stack>
                  <Stack.Screen name={'(tabs)'} options={{headerShown: false }} />
              </Stack>
          </SQLiteProvider>
      </Suspense>

  );
}
