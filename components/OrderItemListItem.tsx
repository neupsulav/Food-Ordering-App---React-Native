import { View, Text, Image } from "react-native";
import React from "react";
import { OrderItem } from "../types";
import ImagePaths from "@/constants/ImagePaths";
import { Tables } from "@/database.types";

type OrderItemListItemProps = {
  item: Tables<"order_items"> & { products: Tables<"products"> };
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View className="flex-row items-center rounded-xl bg-white p-2">
      <Image
        source={{ uri: item.products.image || ImagePaths.defaultImage }}
        className="mr-3 h-[75px] w-[75px]"
        resizeMode="contain"
      />

      <View className="flex-1">
        <Text className="mb-1 text-base font-medium text-gray-900">
          {item.products.name}
        </Text>

        <View className="flex-row items-center gap-1">
          <Text className="font-bold text-blue-600">
            ${item.products.price.toFixed(2)}
          </Text>

          <Text className="text-gray-600">Size: {item.size}</Text>
        </View>
      </View>

      <View className="my-2 flex-row items-center">
        <Text className="text-lg font-medium">{item.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderItemListItem;
