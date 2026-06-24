import React from "react";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const OrderItemsListLayout = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <TopTabs />
    </SafeAreaView>
  );
};

export default OrderItemsListLayout;
