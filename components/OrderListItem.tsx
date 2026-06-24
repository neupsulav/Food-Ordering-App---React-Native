import { View, Text, Pressable } from "react-native";
import React from "react";
import { Order } from "../types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link } from "expo-router";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  return (
    <Link href={`/orders/${order.id}`} asChild>
      <Pressable className="flex-row items-center justify-between rounded-xl bg-white p-3">
        <View>
          <Text className="my-1 font-bold text-black">Order #{order.id}</Text>

          <Text className="text-gray-500">
            {dayjs(order.created_at).fromNow()}
          </Text>
        </View>

        <Text className="font-medium capitalize text-gray-700">
          {order.status}
        </Text>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;
