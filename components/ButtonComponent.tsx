import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ButtonComponent = ({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-orange-500 p-4 rounded-full items-center justify-center mt-6"
      onPress={onPress}
    >
      <Text className="text-white font-bold text-lg">{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
