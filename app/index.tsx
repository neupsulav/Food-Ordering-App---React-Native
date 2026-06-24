import ButtonComponent from "@/components/ButtonComponent";
import { Redirect, useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();
  // return <Redirect href="/(admin)" />;

  // buttons to redirect to either user menu or admin menu
  return (
    <View>
      <ButtonComponent
        text="User Menu"
        onPress={() => router.push("/(user)")}
      />
      <ButtonComponent
        text="Admin Menu"
        onPress={() => router.push("/(admin)")}
      />
    </View>
  );
}
