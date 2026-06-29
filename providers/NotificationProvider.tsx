import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { PropsWithChildren, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const { profile } = useAuth();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => {
        console.log("Failed to register push notifications:", error);
      });

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      },
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  useEffect(() => {
    if (!expoPushToken || !profile?.id) {
      return;
    }

    const savePushToken = async () => {
      const { error } = await supabase
        .from("profiles")
        .update({
          expo_push_token: expoPushToken,
        })
        .eq("id", profile.id);

      if (error) {
        console.error("Error saving push token to Supabase:", error.message);
      } else {
        console.log("Push token successfully saved to Supabase.");
      }
    };

    savePushToken();
  }, [expoPushToken, profile?.id]);

  console.log("push token:", expoPushToken);
  console.log("notification:", notification);

  return <>{children}</>;
};

export default NotificationProvider;
