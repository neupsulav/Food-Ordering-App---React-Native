import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import products from "@/assets/data/products";
import ProductListItem from "@/components/ProductListItem";
import { Link, Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// const product = products[0];

const MenuPage = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-gray-50">
      {/* for naming the header of the page */}
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <TouchableOpacity>
              <Link href="/(admin)/product/create">
                <FontAwesome name="plus-square-o" size={24} color="#F97316" />
              </Link>
            </TouchableOpacity>
          ),
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
