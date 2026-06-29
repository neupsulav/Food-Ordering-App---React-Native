import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import ImagePaths from "@/constants/ImagePaths";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useProduct } from "@/api/products";
import RemoteImage from "@/components/RemoteImage";

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return <ActivityIndicator className="flex-1 justify-center items-center" />;
  }

  if (error) {
    return (
      <Text className="flex-1 justify-center items-center">
        {error.message}
      </Text>
    );
  }

  return (
    <View className="flex-1 p-2">
      {/* for naming the header of the page */}
      <Stack.Screen
        options={{
          title: product?.name,
          headerRight: () => (
            <TouchableOpacity>
              <Link href={`/(admin)/product/create?id=${id}`}>
                <FontAwesome name="pencil" size={24} color="#F97316" />
              </Link>
            </TouchableOpacity>
          ),
        }}
      />

      {/* image of product */}
      {/* <Image
        source={{ uri: product?.image || ImagePaths.defaultImage }}
        className="mt-6 w-full aspect-square rounded-xl"
        resizeMode="contain"
      /> */}
      <RemoteImage
        path={product?.image}
        fallback={ImagePaths.defaultImage}
        className="mt-6 w-full aspect-square rounded-xl"
        resizeMode="contain"
      />

      <Text className="font-bold text-2xl mt-4 text-center">
        {product?.name}
      </Text>

      <Text className="font-semibold text-xl mt-4 text-center">
        ${product?.price}
      </Text>
    </View>
  );
};

export default ProductDetailsScreen;
