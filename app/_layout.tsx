import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CartProvider from "../providers/CartProvider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <Stack
          initialRouteName="index"
          screenOptions={{ statusBarStyle: "dark" }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
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
    </SafeAreaProvider>
  );
}
