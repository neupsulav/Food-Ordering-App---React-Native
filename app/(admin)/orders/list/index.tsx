import React from "react";
import { FlatList, Text, View } from "react-native";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const OrdersPage = () => {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: true, title: "Active" }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </SafeAreaView>
  );
};

export default OrdersPage;
