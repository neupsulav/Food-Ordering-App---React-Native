import { View, Text, Image } from "react-native";
import React from "react";
import { Product } from "@/types";
import ImagePaths from "@/constants/ImagePaths";

type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <View className="bg-white p-3 m-2 rounded-2xl flex-1 shadow-sm border border-gray-100 max-w-[48%]">
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
    </View>
  );
};

export default ProductListItem;
