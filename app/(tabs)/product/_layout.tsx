import { View, Text, Platform } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ProductLayout = () => {
  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        animation: Platform.OS === "android" ? "slide_from_right" : "default",
      }}
    />
  );
};

export default ProductLayout;
