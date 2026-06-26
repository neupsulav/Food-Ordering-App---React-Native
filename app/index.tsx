import ButtonComponent from "@/components/ButtonComponent";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/(auth)/signin"} />;
  }

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
        onPress={() => router.push("/(auth)/signin")}
      />
      <ButtonComponent
        text="Sign Out"
        onPress={() => supabase.auth.signOut()}
      />
    </View>
  );
}
