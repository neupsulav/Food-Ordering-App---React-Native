import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import ButtonComponent from "@/components/ButtonComponent";
import ImagePaths from "@/constants/ImagePaths";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "expo-crypto";
import * as FileSystem from "expo-file-system/legacy";
import * as ImageManipulator from "expo-image-manipulator";
import { decode } from "base64-arraybuffer";
import RemoteImage from "@/components/RemoteImage";

const CreateProductScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0],
  );
  const isUpdating = !!id;

  const { mutate: insertProduct, isPending: isInserting } = useInsertProduct();
  const { mutate: updateProduct, isPending: isUpdatingProduct } =
    useUpdateProduct();
  const { data: product } = useProduct(id);
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const router = useRouter();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setImage(product.image);
    }
  }, [product]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(asset.uri);
    }
  };

  const validateInputs = () => {
    setError("");

    if (!name && !image && !price) {
      setError("Name, image and price are required");
      return false;
    }

    if (!name) {
      setError("Name is required");
      return false;
    }

    if (!price) {
      setError("Price is required");
      return false;
    }

    if (isNaN(parseFloat(price))) {
      setError("Price must be a number");
      return false;
    }

    return true;
  };

  const resetValues = () => {
    setName("");
    setPrice("");
    setImage(null);
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onUpdate = async () => {
    if (!validateInputs()) {
      return;
    }

    let imagePath = image;

    // Check if image has changed (is a local file URI)
    if (image && image.startsWith("file://")) {
      imagePath = await uploadImage();
      if (!imagePath) {
        Alert.alert(
          "Upload Failed",
          "Failed to upload image. Please try again.",
        );
        return;
      }
    }

    updateProduct(
      { id, name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetValues();
          router.back();
        },
      },
    );
  };

  const onCreate = async () => {
    if (!validateInputs()) {
      return;
    }

    const imagePath = await uploadImage();

    // If upload fails, don't proceed
    if (!imagePath && image) {
      Alert.alert("Upload Failed", "Failed to upload image. Please try again.");
      return;
    }

    insertProduct(
      { name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetValues();
          router.back();
        },
      },
    );
  };

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetValues();
        router.replace("/(admin)/product");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ],
    );
  };

  // Upload image using ImageManipulator
  const uploadImage = async () => {
    if (!image) {
      return null;
    }

    // If image is already a URL (not a local file), return it
    if (!image.startsWith("file://")) {
      return image;
    }

    try {
      // Manipulate image to ensure it's in the right format and reduce size
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: { width: 1024 } }], // Resize to max width 1024px
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
      );

      // Read the manipulated image as base64
      const base64 = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Generate a unique filename
      const fileExt = "jpg";
      const fileName = `${randomUUID()}.${fileExt}`;
      // const filePath = `public/${fileName}`;
      const filePath = `${fileName}`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from("product_images")
        .upload(filePath, decode(base64), {
          contentType: `image/${fileExt}`,
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload failed:", error.message);
        return null;
      }

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("product_images").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  return (
    <View className="p-4 flex-1 justify-start">
      <Stack.Screen
        options={{ title: isUpdating ? "Edit Product" : "Create Product" }}
      />

      {isUpdating && (
        <TouchableOpacity
          onPress={confirmDelete}
          activeOpacity={0.8}
          className="w-full items-end"
        >
          <FontAwesome name="trash" size={30} color="#F97316" />
        </TouchableOpacity>
      )}

      {/* <Image
        source={{ uri: image || ImagePaths.defaultImage }}
        className="w-1/2 aspect-square rounded-xl self-center"
      /> */}

      <RemoteImage
        path={image}
        fallback={ImagePaths.defaultImage}
        className="w-1/2 aspect-square rounded-xl self-center"
        resizeMode="contain"
      />

      <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
        <Text className="text-center font-bold text-blue-500">
          Select Image
        </Text>
      </TouchableOpacity>

      <Text className="mb-2">Name</Text>
      <TextInput
        placeholder="Name"
        className="border border-gray-300 rounded-md p-2 px-4 bg-white rounded-lg"
        value={name}
        onChangeText={setName}
      />
      <Text className="mt-6 mb-2">Price ($)</Text>
      <TextInput
        placeholder="9.99"
        keyboardType="numeric"
        className="border border-gray-300 rounded-md p-2 px-4 bg-white rounded-lg"
        value={price}
        onChangeText={setPrice}
      />
      {error && <Text className="text-red-500">{error}</Text>}
      <ButtonComponent
        text={isUpdating ? "Update" : "Create"}
        onPress={() => onSubmit()}
        disabled={isInserting || isUpdatingProduct || isDeleting}
      />
    </View>
  );
};

export default CreateProductScreen;
