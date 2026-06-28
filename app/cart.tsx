import { View, Text, FlatList } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import ButtonComponent from "@/components/ButtonComponent";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = () => {
  const { items, total, checkout } = useCart();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* <Stack.Screen options={{ title: "Your Cart", headerShown: true,  }} /> */}

      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem item={item} />}
        contentContainerClassName="p-4"
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-gray-400 text-lg">Your cart is empty</Text>
          </View>
        }
      />

      {items.length > 0 && (
        <View className="bg-white p-6 rounded-t-3xl shadow-lg border-t border-gray-100">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-500 font-medium text-lg">Total</Text>
            <Text className="text-2xl font-bold text-gray-800">
              ${total.toFixed(2)}
            </Text>
          </View>

          <ButtonComponent text="Checkout" onPress={checkout} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
