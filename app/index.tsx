import ButtonComponent from "@/components/ButtonComponent";
import { Redirect, useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <ButtonComponent
        text="User Menu"
        onPress={() => router.push("/(user)")}
      />
      <ButtonComponent
        text="Admin Menu"
        onPress={() => router.push("/(admin)")}
      />
      <ButtonComponent
        text="Auth Menu"
        onPress={() => router.push("/(auth)")}
      />
    </View>
  );
}
