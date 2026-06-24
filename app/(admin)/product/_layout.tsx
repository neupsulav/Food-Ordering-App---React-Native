import { View, Text, Platform, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ProductLayout = () => {
  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        animation: Platform.OS === "android" ? "slide_from_right" : "default",
        headerRight: () => (
          <TouchableOpacity>
            <Link href="/cart">
              <FontAwesome name="shopping-cart" size={24} color="#F97316" />
            </Link>
          </TouchableOpacity>
        ),
      }}
    />
  );
};

export default ProductLayout;
