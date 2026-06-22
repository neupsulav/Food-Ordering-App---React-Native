import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { Product } from "@/types";
import ImagePaths from "@/constants/ImagePaths";
import { Link, useRouter } from "expo-router";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-white p-3 m-2 rounded-2xl flex-1 shadow-sm border border-gray-100 max-w-[48%]"
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <Image
        source={{ uri: product.image || ImagePaths.defaultImage }}
        className="w-full aspect-square rounded-xl"
        resizeMode="contain"
      />
      <Text
        className="font-bold text-base mt-2 text-gray-800"
        numberOfLines={1}
      >
        {product.name}
      </Text>
      <Text className="font-bold text-orange-500 mt-1">
        ${product.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductListItem;
