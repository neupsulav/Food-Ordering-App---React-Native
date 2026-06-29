import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CartProvider from "../providers/CartProvider";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import NotificationProvider from "@/providers/NotificationProvider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <QueryProvider>
          <NotificationProvider>
            <CartProvider>
              <Stack
                initialRouteName="index"
                screenOptions={{ statusBarStyle: "dark" }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(user)" options={{ headerShown: false }} />
                <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="cart"
                  options={{
                    presentation: "modal",
                    animation: "slide_from_bottom",
                    headerShown: false,
                  }}
                />
              </Stack>
            </CartProvider>
          </NotificationProvider>
        </QueryProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
