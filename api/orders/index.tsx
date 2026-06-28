import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables, Product } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// fetch lists of orders - all orders for admin
export const useAdminOrdersList = ({
  archived = false,
}: {
  archived?: boolean;
}) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];

  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        return [];
      }
      return data;
    },
  });
};

// fetch lists of orders - user's orders
export const useMyOrderList = () => {
  const { session } = useAuth();
  const id = session?.user?.id;

  return useQuery({
    queryKey: ["orders", { userId: id }],
    queryFn: async () => {
      // check if user id exists
      if (!id) return null;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        return [];
      }
      return data;
    },
  });
};

// read order by id
export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["orders", { id }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        return null;
      }
      return data;
    },
  });
};

// insert orders
export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const id = session?.user?.id;

  return useMutation({
    mutationFn: async (orderData: InsertTables<"orders">) => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("orders")
        .insert({
          user_id: id,
          total: orderData.total,
        })
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};

// update order status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
