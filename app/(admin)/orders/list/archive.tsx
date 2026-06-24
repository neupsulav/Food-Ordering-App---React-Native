import React from "react";
import { FlatList, Text, View } from "react-native";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const ArchivePage = () => {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: true, title: "Archive" }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </SafeAreaView>
  );
};

export default ArchivePage;
