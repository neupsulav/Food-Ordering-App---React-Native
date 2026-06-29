import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import ImagePaths from "@/constants/ImagePaths";
import ButtonComponent from "@/components/ButtonComponent";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { useProduct } from "@/api/products";
import RemoteImage from "@/components/RemoteImage";

// pizza sizes
const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { addItem } = useCart();
  const router = useRouter();

  const { data: product, isLoading, error } = useProduct(id);

  // state to store the selected size
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const onAddToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);

    // navigate to cart
    router.push("/cart");
  };

  if (isLoading) {
    return <ActivityIndicator className="flex-1 justify-center items-center" />;
  }

  if (error) {
    return (
      <Text className="flex-1 justify-center items-center">
        {error.message}
      </Text>
    );
  }

  return (
    <View className="flex-1 p-2">
      {/* for naming the header of the page */}
      <Stack.Screen options={{ title: product?.name }} />

      {/* image of product */}
      {/* <Image
        source={{ uri: product?.image || ImagePaths.defaultImage }}
        className="mt-6 w-full aspect-square rounded-xl"
        resizeMode="contain"
      /> */}

      <RemoteImage
        path={product?.image}
        fallback={ImagePaths.defaultImage}
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
