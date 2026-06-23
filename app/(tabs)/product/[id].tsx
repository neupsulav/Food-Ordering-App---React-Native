import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import ImagePaths from "@/constants/ImagePaths";
import ButtonComponent from "@/components/ButtonComponent";

// pizza sizes
const sizes = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  // state to store the selected size
  const [selectedSize, setSelectedSize] = useState("M");

  const product = products.find((p) => p.id === Number(id));

  const onAddToCart = () => {
    console.log("Add to Cart");
  };

  if (!product) {
    return (
      <View>
        <Stack.Screen options={{ title: "Product Not Found" }} />
        <Text>Product Not Found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-2">
      {/* for naming the header of the page */}
      <Stack.Screen options={{ title: product?.name }} />

      {/* image of product */}
      <Image
        source={{ uri: product?.image || ImagePaths.defaultImage }}
        className="mt-6 w-full aspect-square rounded-xl"
        resizeMode="contain"
      />

      <Text className="font-bold text-lg ">Select Size</Text>

      <View className="flex-row justify-center items-center">
        {sizes.map((size) => (
          <View key={size} className="items-center justify-center mx-6 mt-6">
            <Text
              className={`w-12 h-12 bg-gray-200 font-bold text-center border border-gray-300 rounded-full p-2 m-1 ${selectedSize === size ? "bg-orange-500 text-white" : ""}`}
              onPress={() => setSelectedSize(size)}
            >
              {size}
            </Text>
          </View>
        ))}
      </View>

      <Text className="font-bold text-xl mt-4 text-center">
        ${product?.price}
      </Text>

      <ButtonComponent text="Add to Cart" onPress={onAddToCart} />
    </View>
  );
};

export default ProductDetailsScreen;
