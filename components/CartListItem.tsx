import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { CartItem } from "@/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCart } from "@/providers/CartProvider";
import ImagePaths from "@/constants/ImagePaths";

type CartListItemProps = {
  item: CartItem;
};

const CartListItem = ({ item }: CartListItemProps) => {
  const { updateQuantity } = useCart();

  return (
    <View className="bg-white rounded-2xl p-3 flex-row items-center mb-3 shadow-sm border border-gray-100">
      {/* Product Image */}
      <Image
        source={{ uri: item.product.image || ImagePaths.defaultImage }}
        className="w-20 h-20 rounded-xl mr-4"
        resizeMode="contain"
      />

      {/* Product Details */}
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>
          {item.product.name}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-orange-500 font-bold text-base">
            ${item.product.price.toFixed(2)}
          </Text>
          <View className="bg-gray-100 px-2 py-0.5 rounded-md ml-3">
            <Text className="text-gray-500 font-bold text-xs uppercase">
              Size: {item.size}
            </Text>
          </View>
        </View>
      </View>

      {/* Quantity Controls */}
      <View className="flex-row items-center bg-gray-50 rounded-full px-2 py-1">
        <Pressable
          onPress={() => updateQuantity(item.id, -1)}
          className="w-8 h-8 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <FontAwesome name="minus" size={12} color="#4b5563" />
        </Pressable>

        <Text className="mx-3 font-bold text-lg text-gray-800">
          {item.quantity}
        </Text>

        <Pressable
          onPress={() => updateQuantity(item.id, 1)}
          className="w-8 h-8 items-center justify-center rounded-full bg-orange-500 shadow-sm"
          //   to not let user add more than 100 items
          disabled={item.quantity === 100}
        >
          <FontAwesome name="plus" size={12} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default CartListItem;
