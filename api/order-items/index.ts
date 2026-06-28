import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables, Product } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// insert order items in orders
export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderItems: InsertTables<"order_items">[]) => {
      const { data: newProduct, error } = await supabase
        .from("order_items")
        .insert(orderItems)
        .select();

      if (error) {
        throw error;
      }
      if (!newProduct) {
        return null;
      }
      return newProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// get list of order items based on order id
export const useOrderItemsList = (orderId: number) => {
  return useQuery({
    queryKey: ["order-items", { orderId }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);
      if (error) {
        throw error;
      }
      if (!data) {
        return [];
      }
      return data;
    },
  });
};
