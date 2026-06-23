import { View, Text, Modal } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CartScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white mt-10">
      <Stack.Screen options={{ title: "Cart" }} />
      <Text className="text-xl font-bold">Cart Screen</Text>
    </View>
  );
};

export default CartScreen;
