import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductListItem from "@/components/ProductListItem";
import { Stack } from "expo-router";
import { useProductsList } from "@/api/products";

const MenuPage = () => {
  const insets = useSafeAreaInsets();

  const { data: products, isLoading, error } = useProductsList();

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

  if (!products || products.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center">No products found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* for naming the header of the page */}
      <Stack.Screen
        options={{
          title: "Menu",
        }}
      />

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerClassName="p-2"
        contentContainerStyle={{
          paddingBottom: insets.bottom + 16,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MenuPage;
