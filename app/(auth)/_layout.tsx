import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
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
