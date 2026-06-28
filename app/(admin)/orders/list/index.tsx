import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useAdminOrdersList } from "@/api/orders";
import { useInsertOrdersSubscription } from "@/api/orders/subscription";

const OrdersPage = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrdersList({ archived: false });

  useInsertOrdersSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

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
