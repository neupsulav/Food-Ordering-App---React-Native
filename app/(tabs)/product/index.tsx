import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import products from "@/assets/data/products";
import ProductListItem from "@/components/ProductListItem";
import { Stack } from "expo-router";

// const product = products[0];

const MenuPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* for naming the header of the page */}
      <Stack.Screen options={{ title: "Menu" }} />

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerClassName="p-2 pb-24"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MenuPage;
