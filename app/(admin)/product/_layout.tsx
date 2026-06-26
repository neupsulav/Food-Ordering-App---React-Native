import { View, Text, Platform, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ProductLayout = () => {
  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        // animation: Platform.OS === "android" ? "slide_from_right" : "default",
        animation: "slide_from_right",
      }}
    />
  );
};

export default ProductLayout;
