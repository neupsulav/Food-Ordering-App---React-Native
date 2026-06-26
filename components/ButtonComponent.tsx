import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

interface ButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

const ButtonComponent = ({ text, onPress, disabled }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      className={`p-4 rounded-full items-center justify-center mt-6 ${
        disabled ? "bg-gray-300" : "bg-orange-500"
      }`}
    >
      {disabled ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white font-bold text-lg">{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
