import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import ImagePaths from "@/constants/ImagePaths";
import ButtonComponent from "@/components/ButtonComponent";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// pizza sizes
const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const router = useRouter();

  // state to store the selected size
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const product = products.find((p) => p.id === Number(id));

  const onAddToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);

    // navigate to cart
    router.push("/cart");
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
      <Stack.Screen
        options={{
          title: product?.name,
          headerRight: () => (
            <TouchableOpacity>
              <Link href="/(admin)/product/edit">
                <FontAwesome name="pencil" size={24} color="#F97316" />
              </Link>
            </TouchableOpacity>
          ),
        }}
      />

      {/* image of product */}
      <Image
        source={{ uri: product?.image || ImagePaths.defaultImage }}
        className="mt-6 w-full aspect-square rounded-xl"
        resizeMode="contain"
      />

      <Text className="font-bold text-2xl mt-4 text-center">
        ${product?.name}
      </Text>

      <Text className="font-semibold text-xl mt-4 text-center">
        ${product?.price}
      </Text>
    </View>
  );
};

export default ProductDetailsScreen;
