import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useInsertOrdersSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channelName = `custom-insert-channel-${Math.random().toString(36).substring(2, 9)}`;
    const orders = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
      )
      .subscribe();

    return () => {
      orders.unsubscribe(); // unsubscribe to changes on unmounting component to prevent memory leaks
    };
  }, [queryClient]);
};

export const useUpdateOrdersSubscription = (id: number) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const channelName = `custom-filter-channel-${id}-${Math.random().toString(36).substring(2, 9)}`;
    const orders = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["orders", { id }] });
        },
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, [id, queryClient]);
};
