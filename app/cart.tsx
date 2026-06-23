import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CartScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Cart", presentation: "modal" }} />
      <Text>CartScreen</Text>
    </View>
  );
};

export default CartScreen;
