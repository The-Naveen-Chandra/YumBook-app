import React from "react";
import { View, ActivityIndicator } from "react-native";

interface LoadingProps {
  size: "small" | "large";
  className: string;
}

export default function Loading({ size, className }: LoadingProps) {
  return (
    <View className={`flex-1 flex justify-center items-center ${className}`}>
      <ActivityIndicator size={size} />
    </View>
  );
}
