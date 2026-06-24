import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import ButtonComponent from "@/components/ButtonComponent";
import ImagePaths from "@/constants/ImagePaths";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const CreateProductScreen = () => {
  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

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

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
  };

  const onSubmit = () => {
    if (isUpdating) {
      // update product
      onUpdate();
    } else {
      // create product
      onCreate();
    }
  };

  const onUpdate = () => {
    if (!validateInputs()) {
      return;
    }

    console.log("Name: ", name);
    console.log("Price: ", price);
    resetValues();
  };

  const onCreate = () => {
    if (!validateInputs()) {
      return;
    }

    console.log("Name: ", name);
    console.log("Price: ", price);
    resetValues();
  };

  const onDelete = () => {
    console.log("Delete product");
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

  return (
    <View className="p-4 flex-1 justify-start ">
      <Stack.Screen
        options={{ title: isUpdating ? "Edit Product" : "Create Product" }}
      />

      <TouchableOpacity
        onPress={confirmDelete}
        activeOpacity={0.8}
        className="w-full items-end"
      >
        <FontAwesome name="trash" size={30} color="#F97316" />
      </TouchableOpacity>

      <Image
        source={{ uri: image || ImagePaths.defaultImage }}
        className="w-1/2 aspect-square rounded-xl self-center"
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
      />
    </View>
  );
};

export default CreateProductScreen;
