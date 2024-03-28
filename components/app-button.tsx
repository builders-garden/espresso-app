import { Text, TouchableOpacity, View } from "react-native";

export default function AppButton({
  text,
  onPress,
  variant = "primary",
  disabled = false,
  icon,
  size = "medium",
}: {
  text: string;
  onPress: () => void;
  variant?: "primary" | "ghost" | "disabled" | "secondary";
  icon?: React.ReactNode;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}) {
  const sizeClasses = {
    small: "py-1 px-2",
    medium: "py-3 px-4",
    large: "py-5 px-6",
  };

  const textSizeClsses = {
    small: "text-md",
    medium: "text-xl",
    large: "text-2xl",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${
        variant === "ghost"
          ? "bg-primary/20 text-primary"
          : variant === "disabled"
            ? "bg-primary opacity-50"
            : variant === "secondary"
              ? "bg-white border-2 border-primary"
              : "bg-primary border-2 border-primary"
      } ${sizeClasses[size]} rounded-lg flex items-center justify-center font-semibold`}
    >
      <View className="flex flex-row justify-center items-center space-x-1">
        {icon}
        <Text
          className={`${variant === "ghost" || variant === "secondary" ? "text-primary" : "text-white"} font-semibold ${textSizeClsses[size]}`}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
