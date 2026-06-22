import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PRIMARY = "#F97316"; // Orange

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: "#8E8E93",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 4,
        },

        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16,
          height: 70,

          borderRadius: 40,

          backgroundColor: "#fff",
          borderTopWidth: 0,

          elevation: 12,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.08,
          shadowRadius: 10,

          paddingTop: 8,
          paddingBottom: 8,
          marginLeft: 20,
          marginRight: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="menu-book"
              size={focused ? 30 : 26}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="list" size={focused ? 28 : 24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
