import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import { OrderStatusList } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrderDetails, useUpdateOrderStatus } from "@/api/orders";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(Number(id));
  const { mutate: updateOrderStatus } = useUpdateOrderStatus();

  const handleUpdateStatus = (status: string) => {
    updateOrderStatus({ id: Number(id), status });
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !order) {
    return <Text>Error: {error?.message}</Text>;
  }

  return (
    <SafeAreaView className="flex-1 gap-3 p-3" edges={["top"]}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

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
                  onPress={() => handleUpdateStatus(status)}
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
