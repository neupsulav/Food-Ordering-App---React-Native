import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// fetch lists of products
export const useProductsList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
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

// fetch single product details
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
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

// insert new product
export const useInsertProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: any) => {
      const { data, error } = await supabase.from("products").insert(product);
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        return null;
      }
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// update a product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: any) => {
      const { data, error } = await supabase
        .from("products")
        .update(product)
        .eq("id", product.id)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        return null;
      }
      return data;
    },
    onSuccess: async (_, product) => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({
        queryKey: ["products", product.id],
      });
    },
  });
};

// delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        return null;
      }
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
