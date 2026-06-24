import { View, Text, FlatList, Pressable } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import { OrderStatusList } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView className="flex-1 gap-3 p-3" edges={["top"]}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerClassName="gap-3"
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn("Update status")}
                  style={{
                    borderColor: "#1a92e2ff",
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status ? "#1a92e2ff" : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color: order.status === status ? "white" : "#1a92e2ff",
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default OrderDetailScreen;
