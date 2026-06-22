import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      {/* for naming the header of the page */}
      <Stack.Screen options={{ title: `Details of Pizza ${id}` }} />

      <Text>ProductDetailsScreen</Text>
    </View>
  );
};

export default ProductDetailsScreen;
