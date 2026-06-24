import { View, Text, FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-base text-red-500">Order not found!</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 gap-3 p-3">
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerClassName="gap-3"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OrderDetailScreen;
