import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { ActivityIndicator } from "react-native";

const AuthLayout = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack initialRouteName="signin">
      <Stack.Screen
        name="signin"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="signup"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack>
  );
};

export default AuthLayout;
