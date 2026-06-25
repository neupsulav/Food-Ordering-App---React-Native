import React, { useEffect } from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

const AuthLayout = () => {
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      <Redirect href={"/"} />;
    }
  }, [session]);

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
