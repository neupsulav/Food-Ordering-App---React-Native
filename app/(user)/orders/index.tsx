import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useMyOrderList } from "@/api/orders";

const OrdersPage = () => {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: true, title: "Orders" }} />
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
