import { View, Text, Pressable, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import ImagePaths from "@/constants/ImagePaths";

const ProfileScreen = () => {
  const { session, profile, isAdmin } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }
    if (profile?.username) {
      return profile.username.substring(0, 2).toUpperCase();
    }
    if (session?.user?.email) {
      return session.user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  const menuItems = [
    {
      id: "orders",
      title: "My Orders",
      icon: "shopping-bag" as const,
      onPress: () => router.push("/(user)/orders"),
    },
    {
      id: "edit",
      title: "Edit Profile",
      icon: "user" as const,
      onPress: () => {},
    },
    {
      id: "payment",
      title: "Payment Methods",
      icon: "credit-card" as const,
      onPress: () => {},
    },
    {
      id: "settings",
      title: "Settings & Privacy",
      icon: "cog" as const,
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View className="items-center mt-6 px-6 bg-white mx-4 py-8 rounded-3xl shadow-sm border border-gray-100">
          {profile?.avatar_url ? (
            <Image
              source={{ uri: profile.avatar_url }}
              className="w-24 h-24 rounded-full border-4 border-orange-500/20"
              resizeMode="cover"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-orange-100 items-center justify-center border-4 border-orange-100">
              <Text className="text-orange-500 text-3xl font-extrabold">
                {getInitials()}
              </Text>
            </View>
          )}

          {/* User Name */}
          <Text className="text-2xl font-bold text-gray-800 mt-4">
            {profile?.full_name || profile?.username || "Guest User"}
          </Text>

          {/* User Email */}
          <Text className="text-sm text-gray-500 mt-1">
            {session?.user?.email || "No email available"}
          </Text>

          {/* Group / Role Badge */}
          <View
            className={`mt-4 px-4 py-1 rounded-full ${
              isAdmin ? "bg-orange-100" : "bg-blue-100"
            }`}
          >
            <Text
              className={`text-xs font-bold uppercase tracking-wider ${
                isAdmin ? "text-orange-600" : "text-blue-600"
              }`}
            >
              {isAdmin ? "Admin" : "Customer"}
            </Text>
          </View>
        </View>

        {/* Menu Options */}
        <View className="mt-8 px-4">
          <Text className="text-gray-400 font-bold text-xs uppercase pl-2 mb-3 tracking-wider">
            Account Options
          </Text>

          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={item.onPress}
              className="flex-row items-center border border-gray-105 p-4 bg-white rounded-2xl mb-3 shadow-xs active:bg-gray-100/50"
            >
              <View className="w-10 h-10 rounded-xl bg-orange-50 items-center justify-center mr-4">
                <FontAwesome name={item.icon} size={18} color="#f97316" />
              </View>
              <Text className="flex-1 font-semibold text-gray-700 text-base">
                {item.title}
              </Text>
              <FontAwesome name="chevron-right" size={14} color="#9ca3af" />
            </Pressable>
          ))}
        </View>

        {/* Log Out Button */}
        <View className="px-4 mt-6">
          <Pressable
            onPress={handleSignOut}
            className="flex-row items-center justify-center p-4 bg-red-50 border border-red-100 rounded-2xl active:bg-red-100"
          >
            <FontAwesome name="sign-out" size={18} color="#ef4444" />
            <Text className="text-red-600 font-bold text-base ml-2">
              Log Out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
