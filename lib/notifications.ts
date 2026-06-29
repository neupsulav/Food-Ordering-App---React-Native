import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { supabase } from "./supabase";
import { Tables } from "@/database.types";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    try {
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas.projectId,
        })
      ).data;
      console.log(token);
    } catch (e: any) {
      console.warn(
        "Expo Push Notification setup failed. If you are running on Android, please verify that google-services.json is configured, or complete FCM credentials setup. Error:",
        e.message,
      );
    }
  } else {
    console.warn("Must use physical device for Push Notifications");
  }

  return token;
}

export async function sendPushNotification(
  expoPushToken: string,
  title: string,
  body: string,
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

const getUserToken = async (userId: string | null | undefined) => {
  if (!userId) {
    console.error("No user ID found");
    return null;
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("expo_push_token")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user token:", error);
    return null;
  }

  return data?.expo_push_token;
};

export const notifyUserAboutOrderUpdate = async (order: Tables<"orders">) => {
  const token = await getUserToken(order.user_id);
  const title = `Your order is ${order.status}`;
  const body = `Your order #${order.id} has been updated to ${order.status}`;

  if (token) {
    sendPushNotification(token, title, body);
  }
};
