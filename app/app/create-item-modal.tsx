import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/input-field";
import { useState } from "react";
import AppButton from "../../components/app-button";
import { X } from "lucide-react-native";
import { router } from "expo-router";

const CreateItemModal = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  return (
    <SafeAreaView className="p-8">
      <View className="flex flex-col justify-between h-full w-full">
        <View className="flex flex-col space-y-8">
          <View className="flex flex-row justify-between">
            <Text className="font-bold text-2xl">Create new item</Text>
            <X color={"black"} onPress={() => router.back()} />
          </View>
          <View className="flex flex-col space-y-8">
            <View>
              <InputField
                label="Name"
                placeholder="Coffee"
                value={name}
                inputMode="text"
                onChange={setName}
              />
            </View>
            <View>
              <InputField
                label="Price"
                inputMode="numeric"
                placeholder="5.00"
                keyboardType="decimal-pad"
                value={price}
                onChange={setPrice}
              />
            </View>
          </View>
        </View>
        <View className="flex flex-row space-x-4">
          <View className="flex-1">
            <AppButton
              variant="ghost"
              text="Cancel"
              onPress={() => {
                console.log("Cancel item");
                router.back();
              }}
            />
          </View>
          <View className="flex-1">
            <AppButton
              variant={name && price ? "primary" : "disabled"}
              text="Create"
              onPress={() => {
                console.log("Create item");
                router.back();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateItemModal;
